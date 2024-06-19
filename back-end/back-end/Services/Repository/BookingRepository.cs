using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.Domain.Identity;
using back_end.DTO;
using back_end.Enums;
using back_end.ServiceContracts;
using back_end.ServiceContracts.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using Stripe.Checkout;
using Stripe.Climate;
using System.Security.Claims;

namespace back_end.Services.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly INotificationService _notificationService;
        public BookingRepository(ApplicationDbContext context,INotificationService notificationService,UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _notificationService = notificationService;
            _userManager = userManager;
        }
        public async Task<Booking> CreateBookingAsync(BookingDTO bookingDTO,ClaimsPrincipal user)
        {
            var userIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User ID not found in token.");
            }
            var admins = await _userManager.GetUsersInRoleAsync("Admin");
            var adminEmail = admins.FirstOrDefault().Email;
            var admindata = await _userManager.FindByEmailAsync(adminEmail);
            var userId = userIdClaim.Value;
            var booking = new Booking
            {
                BookingId = Guid.NewGuid(),
                ConsumerName = bookingDTO.ConsumerName,
                LpgNo = bookingDTO.LpgNo,
                EmailId = bookingDTO.EmailId,
                PhoneNumber = bookingDTO.PhoneNumber,
                ProductID = Guid.Parse(bookingDTO.ProductID),
                CreatedBy = userId,
                ShippingAddress = bookingDTO.ShippingAddress,
                Price = bookingDTO.Price.ToString(),
                PaymentType = PaymentType.COD,
                PaymentStatus = PaymentStatus.Pending,
            };

            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();
            await _notificationService.SendNotificationAsync(admindata.FcsToken, "New Booking", $"You Have Receive Booking Of LPG No: {booking.LpgNo} Number");
            return booking;
        }

        public async Task<string> CreateCheckoutSessionAsync(BookingDTO booking)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId.ToString() == booking.PaymentId);
            StripeConfiguration.ApiKey = "sk_test_51PHNghSJ9wEfpjx5FTuMJ3wBmD22iBQvgZWtEUulIRZmvRjmD6iPDgyGBbMNHupQNVkHmEcpVOeKTI1Gi9DqnW9W00UV7FbeR8";
            var options = new SessionCreateOptions
            {
                PaymentMethodTypes = new List<string> { "card" },
                LineItems = new List<SessionLineItemOptions>
                {
                    new SessionLineItemOptions
                    {
                        PriceData = new SessionLineItemPriceDataOptions
                        {
                            Currency = "inr",
                            UnitAmount = (long)(booking.Price * 100), // Price in cents
                            ProductData = new SessionLineItemPriceDataProductDataOptions
                            {
                                Name = $"{booking.ProductID.Split("-")} - LPG Cylinder<br/>",
                                
                            },
                        },
                        Quantity = 1,
                    },
                },
                Mode = "payment",
                SuccessUrl = "http://localhost:3009/customer/orders",
                CancelUrl = "http://localhost:3009/customer/booking",
                CustomerEmail = booking.EmailId,
                ClientReferenceId = booking.BookingId,
                Metadata = new Dictionary<string, string>
                {
                    { "ConsumerName", booking.ConsumerName },
                    { "LpgNo", booking.LpgNo },
                    { "PhoneNumber", booking.PhoneNumber },
                    { "ProductID", booking.ProductID },
                    { "CreatedBy", booking.CreatedBy },
                    { "ShippingAddress", booking.ShippingAddress },
                    { "Price", booking.Price.ToString() }
                }
            };

            var service = new SessionService();
            Session session = await service.CreateAsync(options);

            return session.Url;
        }

        public async Task<bool> DeleteBookingAsync(Guid id)
        {
            if (_context.Bookings == null)
            {
                return false;
            }

            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return false;
            }
            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<(decimal?, IEnumerable<Connection>)> GetApprovedConnectionsAsync(ClaimsPrincipal user)
        {
            var userIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User ID not found in token.");
            }

            var userId = userIdClaim.Value;
            var currentYear = DateTime.UtcNow.Year;
            string cylinderPrice = null;

            var approvedConnections = await _context.Connections
                .Include(r => r.Product)
                .Include(r => r.Product.Brand)
                .FirstOrDefaultAsync(r => r.UserId.ToString() == userId);

            if (approvedConnections == null)
            {
                return (null, null); 
            }

            var productDetail = await _context.Products
                .FirstOrDefaultAsync(r => r.ProductId == approvedConnections.ProductId);

            if (productDetail == null)
            {
                return (null, null);
            }

            if (approvedConnections.IsGovScheme)
            {
                var currentYearBookingsCount = await _context.Bookings
                    .CountAsync(c => c.BookingDate.Year == currentYear);

                if (currentYearBookingsCount <= 10)
                {
                    decimal unitPriceDecimal;
                    if (decimal.TryParse(productDetail.UnitPrice, out unitPriceDecimal))
                    {
                        cylinderPrice = (unitPriceDecimal * 0.90m).ToString();
                    }
                }
                else
                {
                    cylinderPrice = productDetail.UnitPrice.ToString();
                }
            }
            else
            {
                cylinderPrice = productDetail.UnitPrice.ToString();
            }

            return (decimal.Parse(cylinderPrice), new List<Connection> { approvedConnections });
        }

        public async Task<Booking> GetBookingByIdAsync(Guid id)
        {
            if (_context.Bookings == null)
            {
                return null;
            }

            var order = await _context.Bookings
                .Include(r => r.Product)
                .Include(b => b.Product.Brand)
                .FirstOrDefaultAsync(i => i.BookingId == id);

            return order;
        }

        public async Task<PagedBookingResult<Booking>> GetBookingsAsync(bool history, int page, int pageSize, string search = null)
        {
            IQueryable<Booking> query = _context.Bookings
              .Include(r => r.Product)
              .ThenInclude(p => p.Brand);

            if (history)
            {
                query = query.Where(r => r.Status == BookingStatus.Confirmed || r.Status == BookingStatus.Cancelled);
            }
            else
            {
                query = query.Where(r => r.Status == BookingStatus.Pending);
            }

            if (!string.IsNullOrEmpty(search))
            {
                var searchLower = search.ToLower();
                query = query.Where(r => r.Product.ProductName.ToLower().Contains(searchLower));
            }

            var totalBookings = await query.CountAsync();

            var pagedBookings = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedBookingResult<Booking>
            {
                PagedBookings = pagedBookings,
                TotalBookings = totalBookings
            };
        }

        public async Task<Booking> GetBookingsByUserIdAsync(string lpgNo)
        {
            if (_context.Bookings == null)
            {
                return null;
            }
            var booking = await _context.Bookings
         .Include(r => r.Product)
         .ThenInclude(p => p.Brand)
         .Where(b => b.LpgNo == lpgNo)
         .OrderByDescending(b => b.BookingDate)
         .FirstOrDefaultAsync();
            return booking;
        }

        public async Task<Booking> GetLatestBookingAsync(ClaimsPrincipal user)
        {
            var userIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User ID not found in token.");
            }

            var userId = userIdClaim.Value;
            return await _context.Bookings
                .Include(p => p.Product)
                .Include(b=>b.Product.Brand)
                .Where(b => b.CreatedBy == userId)
                .OrderByDescending(b => b.BookingDate)
                .FirstOrDefaultAsync();
        }

        public async Task<Domain.Entities.Order> GetOrderByBookingIdAsync(Guid bookingId)
        {
            return await _context.Orders
                .Include(r => r.Booking)
                    .Include(b => b.Booking.Product)
                        .Include(p => p.Booking.Product.Brand)
                .FirstOrDefaultAsync(i => i.BookingId == bookingId);
        }

        public async Task<List<Staff>> GetStaffsAsync()
        {
            return await _context.Staffs.ToListAsync();
        }


    }
}

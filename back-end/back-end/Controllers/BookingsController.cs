using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.DTO;
using back_end.Enums;
using Stripe.Checkout;
using Microsoft.AspNetCore.Authorization;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public BookingsController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }

            var totalRecords = await _context.Bookings.CountAsync();
            var totalPages = (int)Math.Ceiling((double)totalRecords / pageSize);

            var bookings = await _context.Bookings
                .Include(r => r.Product)
                .Include(r => r.Product.Brand)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            Response.Headers.Add("X-Total-Count", totalRecords.ToString());
            Response.Headers.Add("X-Total-Pages", totalPages.ToString());

            return Ok(bookings);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(Guid id)
        {
          if (_context.Bookings == null)
          {
              return NotFound();
          }
            var booking = await _context.Bookings.FindAsync(id);

            if (booking == null)
            {
                return NotFound();
            }

            return booking;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutBooking(Guid id, Booking booking)
        {
            if (id != booking.BookingId)
            {
                return BadRequest();
            }

            _context.Entry(booking).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookingExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking([FromBody]BookingDTO bookingDTO)
        {
          if (_context.Bookings == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Bookings'  is null.");
          }

            var booking = new Booking
            {
                BookingId= Guid.NewGuid(),
                ConsumerName = bookingDTO.ConsumerName,
                LpgNo = bookingDTO.LpgNo,
                EmailId = bookingDTO.EmailId,
                PhoneNumber = bookingDTO.PhoneNumber,
                ProductID  = Guid.Parse(bookingDTO.ProductID),
                CreatedBy = bookingDTO.CreatedBy,
                ShippingAddress = bookingDTO.ShippingAddress,
                Price = bookingDTO.Price.ToString(),
                PaymentType = PaymentType.CashOnDelivery,
                PaymentStatus=PaymentStatus.Pending,
            };
           
            _context.Bookings.Add(booking);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBooking", new { id = booking.BookingId }, booking);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(Guid id)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }
            var booking = await _context.Bookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.Bookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("Details/{userId}")]
        public async Task<ActionResult<IEnumerable<Connection>>> GetApprovedConnections(string userId)
        {
            if (!_context.Connections.Any())
            {
                return NotFound();
            }

            var currentYear = DateTime.UtcNow.Year;

            string cylinderPrice=null;

            var approvedConnections = await _context.Connections
                .Include(r => r.Product)
                .Include(r=>r.Product.Brand)
                .FirstOrDefaultAsync(r => r.UserId.ToString() == userId);

            if (approvedConnections == null)
            {
                return NotFound("No approved connections found for the specified user.");
            }

            var productDetail = await _context.Products
                .FirstOrDefaultAsync(r => r.ProductId == approvedConnections.ProductId);

            if (productDetail == null)
            {
                return NotFound("Product details not found for the approved connection.");
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
                return Ok(new { CylinderPrice = cylinderPrice, ApprovedConnection = approvedConnections });
            }
            else
            {
                cylinderPrice = productDetail.UnitPrice.ToString();

                return Ok(new { CylinderPrice = cylinderPrice, ApprovedConnection = approvedConnections });
            }
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] BookingDTO booking)
        {
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
                                Name = $"{booking.ProductID} - LPG Cylinder",
                            },
                        },
                        Quantity = 1,
                    },
                },
                Mode = "payment",
                SuccessUrl = "http://localhost:3000/success",
                CancelUrl = "http://localhost:3000/cancel",
                CustomerEmail = booking.EmailId,
                ClientReferenceId = booking.BookingId
            };

            var service = new SessionService();
            Session session = await service.CreateAsync(options);

            var bookingEntity = new Booking
            {
                BookingId=Guid.Parse(booking.BookingId),
                ConsumerName = booking.ConsumerName,
                LpgNo = booking.LpgNo,
                EmailId = booking.EmailId,
                PhoneNumber = booking.PhoneNumber,
                ProductID = Guid.Parse(booking.ProductID),
                CreatedBy = booking.CreatedBy,
                ShippingAddress = booking.ShippingAddress,
                Price = booking.Price.ToString(),
                PaymentType = PaymentType.Online,
                PaymentStatus = PaymentStatus.Pending,
                PaymentDate = DateTime.UtcNow,
                PaymentId = session.Id
            };

            _context.Bookings.Add(bookingEntity);
            await _context.SaveChangesAsync();

            return Ok(new { url = session.Url });
        }
    
        private bool BookingExists(Guid id)
            {
                return (_context.Bookings?.Any(e => e.BookingId == id)).GetValueOrDefault();
            }
        }
}

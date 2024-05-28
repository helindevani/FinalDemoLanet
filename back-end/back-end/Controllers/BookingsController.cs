﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.DTO;
using back_end.Enums;
using Stripe.Checkout;
using Microsoft.AspNetCore.Authorization;
using Stripe;
using System.Security.Claims;

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
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings([FromQuery]bool history)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }
            List<Booking> bookings;
            if (history)
            {
                bookings = await _context.Bookings
               .Include(r => r.Product)
               .Include(r => r.Product.Brand)
               .Where(r => r.Status == BookingStatus.Confirmed || r.Status == BookingStatus.Cancelled)
               .ToListAsync();
            }
            else
            {
                bookings = await _context.Bookings
                .Include(r => r.Product)
                .Include(r => r.Product.Brand)
                .Where(r => r.Status == BookingStatus.Pending)
                .ToListAsync();
            }


            return Ok(bookings);
        }

        [HttpGet("BookingDetails")]
        public async Task<IActionResult> GetLatestBookingDetails()
        {
            if (_context.Bookings == null)
            {
                return NotFound("Bookings context is null.");
            }

            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            var userId = userIdClaim.Value;

            var booking = await _context.Bookings
                .Where(b => b.CreatedBy == userId)
                .OrderByDescending(b => b.BookingDate)
                .FirstOrDefaultAsync();

            if (booking == null)
            {
                return NotFound("No bookings found for the user.");
            }

            if (booking.Status == BookingStatus.Confirmed)
            {
                var order = await _context.Orders
                .Include(r => r.Booking)
                    .ThenInclude(b => b.Product)
                        .ThenInclude(p => p.Brand)
                .FirstOrDefaultAsync(i => i.BookingId == booking.BookingId);

                if (order == null)
                {
                    return NotFound("No orders found for the booking.");
                }

                if (order.OrderStatus == OrderStatus.Delivered)
                {
                    return Ok(new { Message= "No active orders for your account.",});
                }
                return Ok(new { Message="Order Successfully Places",Order = order });
            }

            if (booking.Status == BookingStatus.Pending)
            {
                return Ok(new
                {
                    Message = "Order not placed.",
                    Booking = booking
                });
            }

            return BadRequest("Unhandled booking status.");
        }


        [HttpGet("b{id}")]
        public async Task<ActionResult<Booking>> GetBooking(Guid id)
        {
            if (_context.Bookings == null)
            {
                return NotFound();
            }

            var order = await _context.Bookings
                .Include (r => r.Product)
                .Include(b=>b.Product.Brand)
                .FirstOrDefaultAsync(i => i.BookingId == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBooking(string userId)
        {
          if (_context.Bookings == null)
          {
              return NotFound();
          }
            var booking = await _context.Bookings.Include(r=>r.Product).Include(s=>s.Product.Brand).FirstOrDefaultAsync(r=>r.CreatedBy==userId);
            var staff = await _context.Staffs.ToListAsync();

            if (booking == null)
            {
                return NotFound();
            }

            return Ok(new {staff,booking});
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

            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            var userId = userIdClaim.Value;
            var latestBooking = await _context.Bookings
        .Where(b => b.CreatedBy == userId)
        .OrderByDescending(b => b.BookingDate)
        .FirstOrDefaultAsync();

            if (latestBooking != null)
            {
                if (latestBooking.Status == BookingStatus.Pending)
                {
                    return Ok("Last booking is pending.");
                }

                if (latestBooking.Status == BookingStatus.Confirmed)
                {
                    var relatedOrder = await _context.Orders
                        .FirstOrDefaultAsync(o => o.BookingId == latestBooking.BookingId);

                    if (relatedOrder != null && relatedOrder.OrderStatus != OrderStatus.Delivered)
                    {
                        return Ok("Order is placed. Please wait for delivery.");
                    }
                }
            }
            var booking = new Booking
            {
                BookingId= Guid.NewGuid(),
                ConsumerName = bookingDTO.ConsumerName,
                LpgNo = bookingDTO.LpgNo,
                EmailId = bookingDTO.EmailId,
                PhoneNumber = bookingDTO.PhoneNumber,
                ProductID  = Guid.Parse(bookingDTO.ProductID),
                CreatedBy = userId,
                ShippingAddress = bookingDTO.ShippingAddress,
                Price = bookingDTO.Price.ToString(),
                PaymentType = PaymentType.COD,
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

            // Check if the payment type was online and payment status was success
            if (booking.PaymentType ==PaymentType.Online && booking.PaymentStatus == PaymentStatus.Success)
            {

                var paymentIntentId = booking.PaymentId;
                if (!string.IsNullOrEmpty(paymentIntentId))
                {
                    var refundService = new RefundService();
                    var refundOptions = new RefundCreateOptions
                    {
                        PaymentIntent = paymentIntentId
                    };

                    try
                    {
                        var refund = await refundService.CreateAsync(refundOptions);
                        if (refund.Status != "succeeded")
                        {
                            return StatusCode(StatusCodes.Status500InternalServerError, "Refund failed.");
                        }
                    }
                    catch (Exception ex)
                    { 
                        return StatusCode(StatusCodes.Status500InternalServerError, $"Refund failed: {ex.Message}");
                    }
                }
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
                SuccessUrl = "http://localhost:3000/",
                CancelUrl = "http://localhost:3000/cancel",
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

            return Ok(new { url = session.Url });
        }
    
        private bool BookingExists(Guid id)
            {
                return (_context.Bookings?.Any(e => e.BookingId == id)).GetValueOrDefault();
            }
        }
}

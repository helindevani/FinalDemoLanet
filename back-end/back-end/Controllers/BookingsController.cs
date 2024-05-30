using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.DTO;
using back_end.Enums;
using Stripe.Checkout;
using Microsoft.AspNetCore.Authorization;
using Stripe;
using System.Security.Claims;
using back_end.ServiceContracts.Repository;
using back_end.Services.Repository;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IBookingRepository _bookingRepository;
        private readonly IStaffRepository _staffRepository;

        public BookingsController(ApplicationDbContext context,IBookingRepository bookingRepository, IStaffRepository staffRepository)
        {
            _context = context;
            _bookingRepository = bookingRepository;
            _staffRepository = staffRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings([FromQuery]bool history, int page, int pageSize, string search = null)
        {
            var bookings = await _bookingRepository.GetBookingsAsync(history,page,pageSize,search);
            return Ok(bookings);
        }

        [HttpGet("BookingDetails")]
        public async Task<IActionResult> GetLatestBookingDetails()
        {
            var booking = await _bookingRepository.GetLatestBookingAsync(User);

            if (booking == null)
            {
                return NotFound("No bookings found for the user.");
            }

            if (booking.Status == BookingStatus.Confirmed)
            {
                var order = await _bookingRepository.GetOrderByBookingIdAsync(booking.BookingId);

                if (order == null)
                {
                    return NotFound("No orders found for the booking.");
                }

                if (order.OrderStatus == OrderStatus.Delivered)
                {
                    return Ok(new { Message = "No active orders for your account." });
                }

                return Ok(new { Message = "Order Successfully Placed", Order = order });
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

        [HttpGet("B/{id}")]
        public async Task<ActionResult<Booking>> GetBookingById(Guid id)
        {
            var order = await _bookingRepository.GetBookingByIdAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [HttpGet("User")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBooking()
        {
            var booking = await _bookingRepository.GetBookingsByUserIdAsync(User);
            var staff = await _staffRepository.GetStaffs(1,5);

            if (booking == null)
            {
                return NotFound();
            }

            return Ok(new { staff, booking });
        }

      
        [HttpPost]
        public async Task<ActionResult<Booking>> PostBooking([FromBody]BookingDTO bookingDTO)
        {
            var latestBooking = await _bookingRepository.GetLatestBookingAsync(User);

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
            var booking = await _bookingRepository.CreateBookingAsync(bookingDTO,User);

            return CreatedAtAction("GetBooking", new { id = booking.BookingId }, booking);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(Guid id)
        {
            var success = await _bookingRepository.DeleteBookingAsync(id);
            if (!success)
                return NotFound();

            return Ok();
        }


        [HttpGet("Details")]
        public async Task<ActionResult<IEnumerable<Connection>>> GetApprovedConnections()
        {
            try
            {
                var result = await _bookingRepository.GetApprovedConnectionsAsync(User);

                if (result.Item1 == null || result.Item2 == null)
                {
                    return NotFound();
                }

                return Ok(new { CylinderPrice = result.Item1, approvedConnection = result.Item2 });
            }
            catch (UnauthorizedAccessException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [HttpPost("checkout")]
        public async Task<IActionResult> CreateCheckoutSession([FromBody] BookingDTO booking)
        {
           string stripeurl = await _bookingRepository.CreateCheckoutSessionAsync(booking);

            return Ok(new { url = stripeurl });
        }
    
        }
}

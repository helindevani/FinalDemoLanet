using back_end.DatabaseContext;
using back_end.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using Stripe.Checkout;
using System.Text;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class StripeWebhookController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public StripeWebhookController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebhook()
        {
            string json;
            using (var reader = new StreamReader(HttpContext.Request.Body, Encoding.UTF8))
            {
                json = await reader.ReadToEndAsync();
            }

            try
            {
                var stripeEvent = EventUtility.ConstructEvent(
                    json,
                    Request.Headers["stripe-signature"],
                    "whsec_ce25d4889702a7adf94ac741254d3ba6250604b3858b14d1cce13ae52b08ef5b" // Replace with your webhook secret
                );

                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var session = stripeEvent.Data.Object as Session;

                    // Find the booking using the client reference ID (ProductID)
                    var bookingId = Guid.Parse(session.ClientReferenceId);
                    var booking = await _context.Bookings.FindAsync(bookingId);
                    if (booking != null)
                    {
                        booking.PaymentStatus = PaymentStatus.Success;
                        await _context.SaveChangesAsync();
                    }

                    return Ok();
                }

                return BadRequest();
            }
            catch (StripeException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}

using back_end.DatabaseContext;
using back_end.Domain.Entities;
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

        public StripeWebhookController(ApplicationDbContext context)
        {
            _context = context;
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

                    var booking = new Booking
                    {
                        BookingId = Guid.Parse(session.ClientReferenceId),
                        ConsumerName = session.Metadata["ConsumerName"],
                        LpgNo = session.Metadata["LpgNo"],
                        EmailId = session.CustomerEmail,
                        PhoneNumber = session.Metadata["PhoneNumber"],
                        ProductID = Guid.Parse(session.Metadata["ProductID"]),
                        CreatedBy = session.Metadata["CreatedBy"],
                        ShippingAddress = session.Metadata["ShippingAddress"],
                        Price = session.Metadata["Price"],
                        PaymentType = PaymentType.Online,
                        PaymentStatus = PaymentStatus.Success,
                        PaymentDate = DateTime.UtcNow,
                        PaymentId = session.PaymentIntentId
                    };

                    _context.Bookings.Add(booking);
                    await _context.SaveChangesAsync();
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

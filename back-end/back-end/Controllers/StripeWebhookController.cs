using back_end.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class StripeWebhookController : ControllerBase
    {
        private readonly IStripeWebhookRepository _stripeWebhookService;

        public StripeWebhookController(IStripeWebhookRepository stripeWebhookService)
        {
            _stripeWebhookService = stripeWebhookService;
        }

        [HttpPost("webhook")]
        public async Task<IActionResult> StripeWebhook()
        {
            string json;
            using (var reader = new StreamReader(HttpContext.Request.Body, Encoding.UTF8))
            {
                json = await reader.ReadToEndAsync();
            }

            await _stripeWebhookService.HandleWebhookEvent(json, Request.Headers["stripe-signature"]);

            return Ok();
        }
    }
}

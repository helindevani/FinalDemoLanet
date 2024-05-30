using System.Threading.Tasks;

namespace back_end.Services
{
    public interface IStripeWebhookRepository
    {
        Task HandleWebhookEvent(string json, string signature);
    }
}

using back_end.ServiceContracts;
using FirebaseAdmin.Messaging;

namespace back_end.Services
{
    public class NotificationService : INotificationService
    {
        public async Task<string> SendNotificationAsync(string fcmToken, string customerName, string body)
        {
            var message = new Message()
            {
                Token = fcmToken,
                Notification = new Notification()
                {
                    Title = "ORDER UPDATE",
                    Body = $"{body} {customerName}"
                }
            };

            string response = await FirebaseMessaging.DefaultInstance.SendAsync(message);
            return response;
        }
    }
}

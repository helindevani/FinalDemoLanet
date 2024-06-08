namespace back_end.ServiceContracts
{
    public interface INotificationService
    {
        Task<string> SendNotificationAsync(string fcmToken, string customerName, string body);
    }
}

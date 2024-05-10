using back_end.Domain.Entities;

namespace back_end.ServiceContracts.Repository
{
    public interface INotificationHub
    {
        public Task SendMessage(Notification notification);
    }
}

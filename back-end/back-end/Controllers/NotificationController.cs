
using back_end.Domain.Entities;
using back_end.ServiceContracts.Repository;
using back_end.Services.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly IHubContext<NotificationHub, INotificationHub> _hubContext;

        public NotificationController(IHubContext<NotificationHub, INotificationHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task UpdateProduct()
        {

            await _hubContext.Clients.All.SendMessage(new Notification
            {
                NotificationId = Guid.NewGuid(),
                Id = Guid.NewGuid(),
                Message = "Sample notification 1",
                Timestamp = DateTime.UtcNow,
                IsRead = false
            });
        }
    }
}


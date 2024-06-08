using back_end.DTO;
using back_end.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using back_end.ServiceContracts.Repository;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userService;
        private readonly IOrderRepository _orderRepository;

        public UserController(IUserRepository userService,IOrderRepository orderRepository)
        {
            _userService = userService;
            _orderRepository = orderRepository;
        }

        [HttpGet("AppliedNewConnection")]
        public async Task<IActionResult> AppliedNewConnection()
        {
            return await _userService.AppliedNewConnection(User);
        }

        [HttpPost("LinkConnection")]
        public async Task<IActionResult> LinkConnection([FromBody] LinkConnectionRequest LpgNo)
        {
            return await _userService.LinkConnection(User, LpgNo.LpgNo);
        }

        [HttpPost("StaffRating")]
        public async Task<IActionResult> StaffRating(Guid id, int rating)
        {
            return await _userService.StaffRating(id, rating);
        }

        [HttpPost("IsGivenRating")]
        public async Task<bool> IsGivenRating(Guid id)
        {
            return await _userService.IsGivenRating(id);
        }

        [HttpGet("DownloadInvoice")]
        public async Task<IActionResult> DownloadInvoice([FromQuery]Guid id)
        {
            var order = await _orderRepository.GetOrder(id); 

            var result= await _userService.DownloadInvoice(order);
            return File(result, "application/pdf", "Invoice.pdf");
        }
    }
}

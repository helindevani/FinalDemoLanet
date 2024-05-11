using back_end.DatabaseContext;
using back_end.Domain.Identity;
using back_end.Enums;
using back_end.ServiceContracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSenderService _emailService;
        public UserController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IEmailSenderService emailService)
        {
            _context = context;
            _userManager = userManager;
            _emailService = emailService;
            
        }

        [HttpGet("AppliedNewConnection/{userId}")]
        public async Task<IActionResult> AppliedNewConnection(Guid userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            if (user.IsHasConnection)
            {
                var connectionForm=  _context.Connections.FirstOrDefault(r=> r.UserId == userId);

                if(connectionForm.Status == ConnectionStatus.Pending)
                {
                    return Ok(new
                    {
                        Status = "Pending",
                        LPGNo = connectionForm.LpgNo
                    });
                }
                else if (connectionForm.Status == ConnectionStatus.Rejected)
                {
                    return Ok(new
                    {
                        Status = "Rejected",
                        LPGNo = connectionForm.LpgNo
                    });
                }
                else
                {
                    return Ok(new
                    {
                        Status = "Success",
                        LPGNo = connectionForm.LpgNo
                    });
                }
            }
            return NoContent();

        }

        [HttpPost("LinkConnection/{userId}")]
        public async Task<IActionResult> LinkConnection(Guid userId,string LpgNo)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            var connection =  _context.Connections.FirstOrDefault(r=>r.LpgNo == LpgNo);
            if (user.IsHasConnectionLinked)
            {
                return BadRequest("User Was Already Linked Accound With System");
            }

            if(connection != null)
            {
                if(user.Id==connection.UserId && connection.Status == ConnectionStatus.Approved)
                {
                    user.IsHasConnectionLinked = true;

                    var message = $"Your LPG Connection No {connection.LpgNo} Is Linked With {user.Name} Account Successfully.";

                    await _emailService.SendEmailAsync(user.Email, "Link Connection", message);

                    return Ok("User Was Linked Successfully On His Account");
                }
            }

            return BadRequest("User Was Not Linked With System");

        }
    }
}

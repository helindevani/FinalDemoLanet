using back_end.DatabaseContext;
using back_end.Domain.Identity;
using back_end.Enums;
using back_end.ServiceContracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace back_end.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSenderService _emailService;

        public UserRepository(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IEmailSenderService emailService)
        {
            _context = context;
            _userManager = userManager;
            _emailService = emailService;
        }

        public async Task<IActionResult> AppliedNewConnection(ClaimsPrincipal user)
        {
            var userIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return new UnauthorizedObjectResult("User ID not found in token.");
            }

            var userId = userIdClaim.Value;
            var appUser = await _userManager.FindByIdAsync(userId);

            if (appUser.IsHasConnection)
            {
                var connectionForm = _context.Connections.FirstOrDefault(r => r.UserId.ToString() == userId);

                if (connectionForm.Status == ConnectionStatus.Pending)
                {
                    return new OkObjectResult(new
                    {
                        Status = "Pending",
                        LPGNo = connectionForm.LpgNo
                    });
                }
                else if (connectionForm.Status == ConnectionStatus.Rejected)
                {
                    return new OkObjectResult(new
                    {
                        Status = "Rejected",
                        LPGNo = connectionForm.LpgNo
                    });
                }
                else
                {
                    return new OkObjectResult(new
                    {
                        Status = "Success",
                        LPGNo = connectionForm.LpgNo
                    });
                }
            }

            return new NoContentResult();
        }

        public async Task<IActionResult> LinkConnection(Guid userId, string LpgNo)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            var connection = _context.Connections.FirstOrDefault(r => r.LpgNo == LpgNo);

            if (user.IsHasConnectionLinked)
            {
                return new BadRequestObjectResult("User was already linked to an account with the system.");
            }

            if (connection != null)
            {
                if (user.Id == connection.UserId && connection.Status == ConnectionStatus.Approved)
                {
                    user.IsHasConnectionLinked = true;

                    var message = $"Your LPG Connection No {connection.LpgNo} is linked with {user.Name} account successfully.";
                    await _emailService.SendEmailAsync(user.Email, "Link Connection", message);

                    return new OkObjectResult("User was linked successfully to his account.");
                }
            }

            return new BadRequestObjectResult("User was not linked with the system.");
        }
    }
}

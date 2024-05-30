using back_end.DatabaseContext;
using back_end.Domain.Identity;
using back_end.Enums;
using back_end.ServiceContracts.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AdminController : ControllerBase
    {
        private readonly IAccountRepository _userService;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _usermanager;

        public AdminController(IAccountRepository userService, ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _userService = userService;
            _context = context;
            _usermanager = userManager;
        }

        [HttpPost("MakeAdmin/{userId}")]
        public async Task<IActionResult> MakeAdminRequest(Guid userId)
        {
            try
            {
                // Check if the user exists and has requested admin role
                if (_context.AdminRequests == null)
                {
                    return NotFound();
                }

                var adminRequest = await _context.AdminRequests.FirstOrDefaultAsync(req => req.Id == userId); 
                if (adminRequest == null)
                {
                    return NotFound();
                }

                var user = await _context.Users.FindAsync(userId);

                if (user != null && await _userService.IsUserInRoleAsync(user, "Admin"))
                {
                    return BadRequest("User already has an admin role.");
                }

                var success = await _userService.AddAdminRoleAsync(userId);

                if (success)
                {
                    if (adminRequest.RequestTypeName == Enums.RequestType.MakeAdmin)
                    {
                        adminRequest.Status = Enums.RequestStatus.Approved;
                        _context.AdminRequests.Update(adminRequest);
                        await _context.SaveChangesAsync();
                        //await _hubContext.Clients.User(userId.ToString()).SendAsync("ReceiveApproval", "Your request has been approved.");
                    }

                    return Ok("Admin role added successfully.");
                }
                else
                {
                    return BadRequest("Failed to add admin role.");
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut("Connection/{userId}")]
        public async Task<IActionResult> ApproveConnectionStatus(Guid userId, [FromQuery] string remark, [FromQuery] string status)
        {
            var connectionForm = await _context.Connections.FirstOrDefaultAsync(r=>r.UserId ==  userId);

            var user = await _usermanager.FindByIdAsync(userId.ToString());

            var request = await _context.AdminRequests.FirstOrDefaultAsync(req => req.Id == userId);

            var approverUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (connectionForm == null)
            {
                return NotFound();
            }

            if (status == ConnectionStatus.Approved.ToString())
            {
                var isRationCardUnique = _context.Connections
                .Where(f => f.RationCardNumber == connectionForm.RationCardNumber && f.UserId != userId)
                .Count() == 0;

                if (isRationCardUnique)
                {
                    connectionForm.Status = ConnectionStatus.Approved;

                    if (connectionForm.Status == ConnectionStatus.Approved)
                    {
                        request.ActionBy = approverUserId;
                        request.Status = RequestStatus.Approved;
                        request.Remark = remark;
                        _context.AdminRequests.Update(request);
                       
                    }
                    await _context.SaveChangesAsync();
                    return Ok("Connection status approved successfully.");
                }
                else
                {
                    connectionForm.Status = ConnectionStatus.Rejected;

                    if (connectionForm.Status == ConnectionStatus.Rejected)
                    {
                        user.IsHasConnection = false;
                        await _usermanager.UpdateAsync(user);
                        request.ActionBy = approverUserId;
                        request.Status = RequestStatus.Rejected;
                        request.Remark = remark;

                        _context.AdminRequests.Update(request);

                    }

                    await _context.SaveChangesAsync();

                    return Ok("Connection status rejected due to You Have Already Hold Gas Connection.");

                }
            }
            else
            {
                return BadRequest("Please Provide valid Data");  
            }

        }

        [HttpGet("Dashboard")]
        public ActionResult<Dictionary<string, int>> GetCount()
        {
            try
            {
                Dictionary<string,int> data = new Dictionary<string, int>();
                int TotalCylinder = _context.Products.Count();
                int TotalSupplier = _context.Brands.Count();
                data.Add("TotalCylinder", TotalCylinder);
                data.Add("TotalSupplier", TotalSupplier);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        public class UserWithRoles
        {
            public string UserId { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public List<string> Roles { get; set; }
        }

        // GET: api/User
        [HttpGet("Users")]
        public async Task<ActionResult<IEnumerable<UserWithRoles>>> GetUsersWithRoles()
        {
            var usersWithRoles = new List<UserWithRoles>();

            var users = await _usermanager.Users.ToListAsync();

            foreach (var user in users)
            {
                var userRoles = await _usermanager.GetRolesAsync(user);
                var userWithRoles = new UserWithRoles
                {
                    UserId = user.Id.ToString(),
                    UserName = user.UserName,
                    Roles = userRoles.ToList(),
                    Email = user.Email
                };
                usersWithRoles.Add(userWithRoles);
            }

            return usersWithRoles;
        }
    }
}


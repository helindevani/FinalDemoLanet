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
        private readonly IUserRepository _userService;
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _usermanager;

        public AdminController(IUserRepository userService, ApplicationDbContext context, UserManager<ApplicationUser> userManager)
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

        //[HttpPut("NewConnection/{userId}")]
        //public async Task<IActionResult> ApproveConnectionStatus(Guid userId, [FromQuery] string remark, [FromQuery] string status)
        //{


        //    if (connectionForm == null)
        //    {
        //        return NotFound();
        //    }

        //    if(status==ConnectionType.Approved.ToString())
        //    {
        //        var isRationCardUnique = _context.NewConnectionForms
        //        .Where(f => f.RationCardNo == connectionForm.RationCardNo && f.UserId != userId.ToString())
        //        .Count() == 0;

        //        var request = await _context.AdminRequests.FirstOrDefaultAsync(req => req.Id == userId);

        //        if (isRationCardUnique)
        //        {
        //            var approverUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        //            connectionForm.ConnectionStatus = ConnectionType.Approved;
        //            connectionForm.UpdateDate = DateTime.UtcNow;

        //            _context.SaveChanges();

        //            if (connectionForm.ConnectionStatus == ConnectionType.Approved)
        //            {
        //                request.Status = RequestStatus.Approved;
        //                request.Remark = remark;
        //                _context.AdminRequests.Update(request);
        //                _context.SaveChanges();
        //            }

        //            return Ok("Connection status approved successfully.");
        //        }
        //    }

        //    var requestr = await _context.AdminRequests.FirstOrDefaultAsync(req => req.Id == userId);

        //    connectionForm.ConnectionStatus = ConnectionType.Rejected;
        //    connectionForm.UpdateDate = DateTime.UtcNow;
        //    _context.SaveChanges();

        //        if (connectionForm.ConnectionStatus== ConnectionType.Rejected)
        //        {
        //            requestr.Status = RequestStatus.Rejected;
        //            requestr.Remark = remark;
        //            _context.AdminRequests.Update(requestr);
        //            _context.SaveChanges();
        //        }

        //        return Ok("Connection status rejected due to You Have Already Hold Gas Connection.");
            

        //}

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


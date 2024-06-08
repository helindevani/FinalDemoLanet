using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.Domain.Identity;
using back_end.Enums;
using back_end.ServiceContracts.Repository;
using back_end.Services.Repository;
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
        private readonly IAdminRepository _adminRepository;

        public AdminController(IAccountRepository userService, ApplicationDbContext context, UserManager<ApplicationUser> userManager, IAdminRepository adminRepository)
        {
            _userService = userService;
            _context = context;
            _usermanager = userManager;
            _adminRepository = adminRepository;
        }

        //[HttpPost("MakeAdmin/{userId}")]
        //public async Task<IActionResult> MakeAdminRequest(Guid userId)
        //{
        //    try
        //    {
        //        // Check if the user exists and has requested admin role
        //        if (_context.AdminRequests == null)
        //        {
        //            return NotFound();
        //        }

        //        var adminRequest = await _context.AdminRequests.FirstOrDefaultAsync(req => req.Id == userId); 
        //        if (adminRequest == null)
        //        {
        //            return NotFound();
        //        }

        //        var user = await _context.Users.FindAsync(userId);

        //        if (user != null && await _userService.IsUserInRoleAsync(user, "Admin"))
        //        {
        //            return BadRequest("User already has an admin role.");
        //        }

        //        var success = await _userService.AddAdminRoleAsync(userId);

        //        if (success)
        //        {
        //            if (adminRequest.RequestTypeName == Enums.RequestType.MakeAdmin)
        //            {
        //                adminRequest.Status = Enums.RequestStatus.Approved;
        //                _context.AdminRequests.Update(adminRequest);
        //                await _context.SaveChangesAsync();
        //                //await _hubContext.Clients.User(userId.ToString()).SendAsync("ReceiveApproval", "Your request has been approved.");
        //            }

        //            return Ok("Admin role added successfully.");
        //        }
        //        else
        //        {
        //            return BadRequest("Failed to add admin role.");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        // Log the exception
        //        return StatusCode(500, "Internal server error");
        //    }
        //}

        [HttpPut("Connection/{lpgNo}")]
        public async Task<IActionResult> ConnectionAction(string lpgNo,[FromQuery] string status)
        {
            return await _adminRepository.UpdateConnectionStatus(User,lpgNo, status);

        }

        [HttpGet("Dashboard")]
        public ActionResult<Dictionary<string, int>> GetCount()
        {
            var data = _adminRepository.GetDashboardCounts();
            return Ok(data);
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

        [HttpGet("GenrateReport")]
        public async Task<IActionResult> GenrateReport([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var result = await _adminRepository.OrderReport(startDate,endDate);
            return File(result, "application/pdf", "Report.pdf");
        }

        [HttpGet("UserWiseBooking")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetUserWiseBooking()
        {
            return await _adminRepository.GetUserWiseBookingsAsync();
        }
    }
}


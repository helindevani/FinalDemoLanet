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
    [Authorize(Roles="Admin")]
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


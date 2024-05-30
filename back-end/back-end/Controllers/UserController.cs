using back_end.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userService;

        public UserController(IUserRepository userService)
        {
            _userService = userService;
        }

        [HttpGet("AppliedNewConnection")]
        public async Task<IActionResult> AppliedNewConnection()
        {
            return await _userService.AppliedNewConnection(User);
        }

        [HttpPost("LinkConnection/{userId}")]
        public async Task<IActionResult> LinkConnection(Guid userId, string LpgNo)
        {
            return await _userService.LinkConnection(userId, LpgNo);
        }
    }
}

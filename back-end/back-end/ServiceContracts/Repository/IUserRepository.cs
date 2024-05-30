using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace back_end.Services
{
    public interface IUserRepository
    {
        Task<IActionResult> AppliedNewConnection(ClaimsPrincipal user);
        Task<IActionResult> LinkConnection(Guid userId, string LpgNo);
    }
}

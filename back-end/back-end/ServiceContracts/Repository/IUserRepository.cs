using back_end.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Claims;
using System.Threading.Tasks;

namespace back_end.Services
{
    public interface IUserRepository
    {
        Task<IActionResult> AppliedNewConnection(ClaimsPrincipal user);
        Task<IActionResult> LinkConnection(ClaimsPrincipal user, string LpgNo);
        Task<IActionResult> StaffRating(Guid id,int rating);
        Task<bool> IsGivenRating(Guid id);

        Task<byte[]> DownloadInvoice(Order order);
    }
}

using back_end.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace back_end.ServiceContracts.Repository
{
    public interface IAdminRepository
    {
        Task<byte[]> OrderReport(DateTime startDate,DateTime endDate);
        Task<IActionResult> UpdateConnectionStatus(ClaimsPrincipal user,string lpgNo, string status);
        Dictionary<string, int> GetDashboardCounts();
        Task<List<Booking>> GetUserWiseBookingsAsync();
    }
}

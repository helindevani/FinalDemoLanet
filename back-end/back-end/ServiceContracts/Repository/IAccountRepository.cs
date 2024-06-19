 using back_end.Domain.Entities;
using back_end.Domain.Identity;
using back_end.DTO;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace back_end.ServiceContracts.Repository
{
    public interface IAccountRepository
    {
        Task<RegisterationResponse> UserRegisterRequest(RegisterDTO registerDTO);
        Task<bool> EmailCheckRequest(string email);
        Task<IActionResult> UserLoginRequest(LoginDTO loginDTO);
        Task<ForgotPasswordRequest> ForgotPasswordRequest(ForgotPasswordRequest request);
        Task<bool> ResetPasswordRequest(ResetPasswordRequestData request);
        Task<bool> ChangePasswordAsync(ClaimsPrincipal user,ChangePasswordRequest request);
        Task<bool> UserLogoutRequest();
        Task<bool> AddAdminRoleAsync(Guid userId);
        Task<bool> IsUserInRoleAsync(ApplicationUser user, string roleName);
        Task<ApplicationUser> UpdateUsedataasync(ClaimsPrincipal user, UserUpdateRequest userdata);
    }
}

 using back_end.Domain.Entities;
using back_end.Domain.Identity;
using back_end.DTO;

namespace back_end.ServiceContracts.Repository
{
    public interface IAccountRepository
    {
        Task<RegisterationResponse> UserRegisterRequest(RegisterDTO registerDTO);
        Task<bool> EmailCheckRequest(string email);
        Task<AuthenticationResponse> UserLoginRequest(LoginDTO loginDTO);
        Task<ForgotPasswordRequest> ForgotPasswordRequest(ForgotPasswordRequest request);
        Task<bool> ResetPasswordRequest(ResetPasswordRequestData request);
        Task<bool> UserLogoutRequest();
        Task<bool> AddAdminRoleAsync(Guid userId);
        Task<bool> IsUserInRoleAsync(ApplicationUser user, string roleName);
    }
}

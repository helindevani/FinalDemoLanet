using System.Net;
using Microsoft.AspNetCore.Identity;
using back_end.Domain.Entities;
using back_end.Domain.Identity;
using back_end.DTO;
using back_end.ServiceContracts;
using back_end.ServiceContracts.Repository;
using Azure;

namespace back_end.Services.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IJwtService _jwtService;
        private readonly IConfiguration _configuration;
        private readonly IEmailSenderService _emailService;

        public UserRepository(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IJwtService jwtService, IConfiguration configuration, IEmailSenderService emailSender)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtService = jwtService;
            _configuration = configuration;
            _emailService = emailSender;
        }

        public async Task<bool> EmailCheckRequest(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user == null)
            {
                return true;
            }
            return false;
        }

        public async Task<ForgotPasswordRequest> ForgotPasswordRequest(ForgotPasswordRequest request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);
            if (user == null)
                throw new InvalidOperationException("User not found");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);

            var resetLink = $"{_configuration["AppBaseUrl"]}/resetpassword?email={request.Email}&token={WebUtility.UrlEncode(token)}";

            var message = $"Please reset your password by clicking <a href='{resetLink}'>here</a>.";

            await _emailService.SendEmailAsync(request.Email, "reset password Link", message);

            return request;
        }

        public async Task<bool> ResetPasswordRequest(ResetPasswordRequestData request)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
                throw new InvalidOperationException("User not found");

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var result = await _userManager.ResetPasswordAsync(user, token, request.NewPassword);

            if (result.Succeeded)
                return true;
            else
                throw new InvalidOperationException("Failed to reset password");
        }

        public async Task<AuthenticationResponse> UserLoginRequest(LoginDTO loginDTO)
        {
            var result = await _signInManager.PasswordSignInAsync(loginDTO.Email, loginDTO.Password, isPersistent: false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(loginDTO.Email);

                if (user == null)
                    throw new InvalidOperationException("User not found");

                var roles = await _userManager.GetRolesAsync(user);

                if (roles == null)
                    throw new InvalidOperationException("Something went wrong");

                var authenticationResponse = _jwtService.CreateJwtToken(user, roles.ToList());

                await _userManager.UpdateAsync(user);

                return authenticationResponse;
            }
            else
            {
                throw new InvalidOperationException("Invalid email or password");
            }
        }

        public async Task<bool> UserLogoutRequest()
        {
            await _signInManager.SignOutAsync();

            return true;
        }

        public async Task<RegisterationResponse> UserRegisterRequest(RegisterDTO registerDTO)
        {
            var response = new RegisterationResponse();

            var user = new ApplicationUser
            {
                Email = registerDTO.Email,
                UserName = registerDTO.Email,
                Name = registerDTO.Name,
                PhoneNumber=registerDTO.MobaileNo
            };

            var result = await _userManager.CreateAsync(user, registerDTO.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRolesAsync(user, registerDTO.Roles);
                response.Success = true;
                response.Message = "User registered successfully.";
            }
            else
            {
                response.Success = false;
                response.Message = "User registration failed.";
                response.Errors = new List<string>();
                foreach (var error in result.Errors)
                {
                    response.Errors.Add(error.Description);
                }
            }

            return response;

        }

        public async Task<bool> AddAdminRoleAsync(Guid userId)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(userId.ToString());
                if (user == null)
                {
                    return false; // User not found
                }

                // Check if the user already has the admin role
                if (await _userManager.IsInRoleAsync(user, "Admin"))
                {
                    return false; // User already has the admin role
                }

                // Add the admin role to the user
                var result = await _userManager.AddToRoleAsync(user, "Admin");
                return result.Succeeded;
            }
            catch (Exception ex)
            {
                // Log the exception
                return false; // Failed to add admin role
            }
        }

        public async Task<bool> IsUserInRoleAsync(ApplicationUser user, string roleName)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (string.IsNullOrWhiteSpace(roleName))
            {
                throw new ArgumentException("Role name cannot be null or empty.", nameof(roleName));
            }

            return await _userManager.IsInRoleAsync(user, roleName);
        }
    }
}

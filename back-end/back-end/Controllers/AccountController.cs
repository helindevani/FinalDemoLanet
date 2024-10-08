﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using back_end.Domain.Entities;
using back_end.Domain.Identity;
using back_end.DTO;
using back_end.ServiceContracts.Repository;

namespace back_end.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAccountRepository _userRepository;

        public AccountController(IAccountRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        public async Task<ActionResult<ApplicationUser>> PostRegister(RegisterDTO registerDTO)
        {
            if (ModelState.IsValid == false)
            {
                string errorMessage = string.Join(" | ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                return Problem(errorMessage);
            }

            var result = await _userRepository.UserRegisterRequest(registerDTO);

            if (result != null)
                return Ok(result);
            else
                return BadRequest("Please Provide Valid Data");
        }

        [HttpGet]
        public async Task<IActionResult> IsEmailAlreadyRegistered(string email)
        {
            var success = await _userRepository.EmailCheckRequest(email);

            if (success)
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> PostLogin([FromBody] LoginDTO loginDTO)
        {
            if (!ModelState.IsValid)
            {
                string errorMessage = string.Join(" | ", ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage));
                return Problem(errorMessage);
            }

            var result = await _userRepository.UserLoginRequest(loginDTO);

            if (result is OkObjectResult)
            {
                return result;
            }
            else if (result is BadRequestObjectResult)
            {
                return result;
            }
            else
            {
                return BadRequest("Please provide valid data");
            }
        }


        [HttpPatch]
        public async Task<IActionResult> UpdateUserData([FromForm]UserUpdateRequest userdata)
        {
            var user = await _userRepository.UpdateUsedataasync(User, userdata);
            return Ok(user);
        }

        [HttpPut]
        public async Task<IActionResult> UpdatePassword([FromBody] ChangePasswordRequest userdata)
        {
            var result = await _userRepository.ChangePasswordAsync(User, userdata);
            if (result)
            {
                return Ok("Password Updated Successfully!!");
            }
            else
            {
                return BadRequest("Soory Failed To Update Password Retry!!");
            }
        }

        [HttpGet("logout")]
        public async Task<IActionResult> GetLogout()
        {
            await _userRepository.UserLogoutRequest();

            return Ok("Successfully Logout Your Account");
        }

        [HttpPost("forgotpassword")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordRequest request)
        {
            var success = await _userRepository.ForgotPasswordRequest(request);
            if (success != null)
            {
                return Ok("Successfully Send Mail For Reset Password");
            }

            return BadRequest("Please Provide valid Data");
        }

        [HttpPost("resetpassword")]
        public async Task<IActionResult> ResetPassword(ResetPasswordRequestData request)
        {

            if (await _userRepository.ResetPasswordRequest(request))
            {
                return Ok("Password reset successfully");
            }

            return BadRequest("Failed to reset password");
        }

    }
}

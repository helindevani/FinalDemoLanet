using System.ComponentModel.DataAnnotations;

namespace back_end.DTO
{
    public class ChangePasswordRequest
    {
        [Required(ErrorMessage = "Password can't be blank")]
        public string Password { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password can't be blank")]
        public string NewPassword { get; set; } = string.Empty;

        [Required(ErrorMessage = "Confirm Password can't be blank")]
        [Compare("NewPassword", ErrorMessage = "Password and confirm password do not match")]
        public string ConfirmNewPassword { get; set; } = string.Empty;
    }
}

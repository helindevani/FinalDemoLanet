namespace back_end.Domain.Entities
{
    public class ResetPasswordRequestData
    {
        public string Email { get; set; }
        public string NewPassword { get; set; }
    }
}

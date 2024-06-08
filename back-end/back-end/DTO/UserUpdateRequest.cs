namespace back_end.DTO
{
    public class UserUpdateRequest
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNumber { get; set; }
        public IFormFile? ProfileImage { get; set; }
        public IFormFile? BannerImage { get; set; }
    }
}

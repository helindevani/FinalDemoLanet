using back_end.Domain.Identity;

namespace back_end.DTO
{
    public class AdminRequestResponse
    {
        public string RequestTypeName { get; set; }
        public string Email { get; set; }
        public DateTime? RequestDate {  get; set; }
        public string? ConnectionNo {  get; set; }
        public string Status { get; set; }
        public string Name { get; set; }
        public string? Remarks { get; set; }
        public ApplicationUser? User { get; set; }

    }
}

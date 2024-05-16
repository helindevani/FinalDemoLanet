using back_end.Enums;

namespace back_end.DTO
{
    public class StaffDTO
    {
        public string? StaffId { get; set; }
        public string StaffName { get; set; }

        public string Gender { get; set; }

        public string AadharCardNo { get; set; }
        public string PhoneNumber { get; set; }

        public string Status { get; set; }

        public DateTime JoiningDate { get; set; }

        public string Address { get; set; }
        public string CreatedBy { get; set; }
    }
}

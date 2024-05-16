using back_end.Enums;
using System.ComponentModel.DataAnnotations;

namespace back_end.Domain.Entities
{
    public class Staff
    {
        [Key]
        public Guid StaffId { get; set; }= Guid.NewGuid();

        [Required]
        public string StaffName { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        public string AadharCardNo { get; set; }
        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public Status Status { get; set; } 

        [Required]
        public DateTime JoiningDate { get; set; }

        [Required]
        public string Address { get; set;}

        [Required]
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime UpdatedDate { get; set;} = DateTime.UtcNow;

        [Required]
        public string CreatedBy { get; set; }
    }
}

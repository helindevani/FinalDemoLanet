using back_end.Enums;
using System.ComponentModel.DataAnnotations;

namespace back_end.Domain.Entities
{
    public class Category
    {
        [Key]
        public Guid CategoryId { get; set; } = Guid.NewGuid();

        [Required]
        public string CategoryName { get; set; }

        [Required]
        public Status CategoryStatus { get; set; }

        [Required]
        public DateTime CreateDate { get; set; } = DateTime.Now;

        [Required]
        public DateTime UpdateDate { get; set; } = DateTime.Now;

        [Required]
        public String? CreatedBy { get; set; }

    }
}

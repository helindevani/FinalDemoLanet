using back_end.Enums;
using System.ComponentModel.DataAnnotations;

namespace back_end.Domain.Entities
{
    public class Brand
    {
        [Key]
        public Guid BrandId { get; set; } = Guid.NewGuid();

        [Required]
        public string BrandName { get; set; }

        [Required]
        public Status BrandStatus { get; set;}

        [Required]
        public DateTime CreateDate { get; set; }= DateTime.Now;

        [Required]
        public DateTime UpdateDate { get; set; } = DateTime.Now;

        [Required]
        public String? CreatedBy { get; set; } 
    }
}

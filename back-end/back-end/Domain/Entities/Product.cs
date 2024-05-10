using back_end.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace back_end.Domain.Entities
{
    public class Product
    {
        [Key]
        public Guid ProductId { get; set; }= Guid.NewGuid();

        [Required]
        public string ProductName { get; set; }

        [Required]
        public string ProductImage {  get; set; }

        [Required]
        [ForeignKey("Brand")]
        public Guid BrandId { get; set; }

        public Brand? Brand { get; set; }

        [Required]
        [ForeignKey("Category")]
        public Guid CategoryId { get; set; }

        public Category? Category { get; set; }

        [Required]
        public string Quantity { get; set; }

        [Required]
        public string UnitPrice { get; set; }

        [Required]
        public Status Status { get; set; }

        public DateTime CreateDate { get; set; } = DateTime.UtcNow;

        public DateTime UpdateDate { get; set; } = DateTime.UtcNow;

        public string CreatedBy { get; set; }
    }
}

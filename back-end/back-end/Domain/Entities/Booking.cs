using back_end.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.Domain.Entities
{
    public class Booking
    {
        [Key]
        public Guid BookingId { get; set; }

        [Required]  
        public string LpgNo { get; set; }

        [Required]
        [ForeignKey("Product")]
        public Guid ProductID { get; set; }

        [Required]
        public Product? Product { get; set; }

        [Required]
        public DateTime BookingDate { get; set; }= DateTime.UtcNow;

        [Required]
        public string Price { get; set; }

        [Required]
        public PaymentType PaymentType { get; set; }

        [Required]
        public string? PaymentId { get; set; }

        [Required]
        public string ShippingAddress { get; set; }

        [Required]
        public Status Status { get; set; }

        [Required]
        public PaymentStatus PaymrntStaus { get; set;}

        [Required]
        public DateTime CreateDate {  get; set; }= DateTime.UtcNow;

        [Required]
        public DateTime UpdateDate {  get; set; }= DateTime.UtcNow;

        [Required]
        public string CreatedBy { get; set; }

    }
}

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
        public string ConsumerName {  get; set; }

        [Required]
        public string PhoneNumber { get; set; }

        [Required]
        public string EmailId { get; set; }

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

        public DateTime? PaymentDate {  get; set; } 

        public string? PaymentId { get; set; }

        [Required]
        public string ShippingAddress { get; set; }

        [Required]
        public BookingStatus Status { get; set; } = BookingStatus.Pending;

        [Required]
        public PaymentStatus? PaymentStatus { get; set;}

        [Required]
        public DateTime CreateDate {  get; set; }= DateTime.UtcNow;

        [Required]
        public DateTime UpdateDate {  get; set; }= DateTime.UtcNow;

        [Required]
        public string CreatedBy { get; set; }

    }
}

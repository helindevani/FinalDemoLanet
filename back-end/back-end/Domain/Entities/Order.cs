using back_end.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.Domain.Entities
{
    public class Order
    {
        [Key]
        public Guid OrderId { get; set; }= Guid.NewGuid();

        [Required]
        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        [Required]
        public string LpgNo { get; set; }

        [Required]
        public string ClientName {  get; set; }

        [Required]
        public string ClientContact { get; set; }

        [Required]
        public string ClientEmail { get; set; }

        [Required]
        public string Address { get; set; }

        [Required]
        [ForeignKey("Staff")]
        public Guid? StaffId { get; set; }

        public Staff? Staff { get; set; }

        [Required]
        [ForeignKey("Booking")]
        public Guid BookingId { get; set; }

        public Booking? Booking { get; set; }

        [Required]
        public string Amount { get; set; }

        [Required]
        public PaymentType PaymentType { get; set; }

        [Required]
        public PaymentStatus PaymentStatus { get; set; }

        [Required]
        public OrderStatus OrderStatus {  get; set; }

        public DateTime? DeliveryDate {  get; set; }
        public bool? IsStaffAccepted {  get; set; }

        [Required]
        public Guid CreatedBy { get; set; }

        [Required]
        public Guid UpdatedBy { get; set; }

        public DateTime CreateDate { get; set; } = DateTime.UtcNow;

        public DateTime UpdateDate { get; set; } = DateTime.UtcNow;

    }
}

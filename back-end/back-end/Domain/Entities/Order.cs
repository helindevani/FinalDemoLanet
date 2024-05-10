using back_end.Enums;
using System.ComponentModel.DataAnnotations;

namespace back_end.Domain.Entities
{
    public class Order
    {
        [Key]
        public Guid OrderId { get; set; }= Guid.NewGuid();

        [Required]
        public DateTime Orderdate { get; set; } = DateTime.UtcNow;

        [Required]
        public string ClientName {  get; set; }

        [Required]
        public string ClientContact { get; set; }

        [Required]
        public string DeliveryStaff { get; set; }

        [Required]
        public DeliveryStatus DeliveryStatus { get; set; }

        [Required]
        public string SubTotal {  get; set; }

        [Required]
        public string Tax { get; set; }

        [Required]
        public string? Subsidy { get; set; }

        [Required]
        public string TotalAmount { get; set; }

        [Required]
        public PaymentType PaymentType { get; set; }

        [Required]
        public PaymentStatus PaymentStatus { get; set; }

        [Required]
        public DateTime PaymentDate { get; set; }

        [Required]
        public OrderStatus OrderStatus {  get; set; }

        [Required]
        public Guid UserId { get; set; }

        public DateTime CreateDate { get; set; } = DateTime.UtcNow;

        public DateTime UpdateDate { get; set; } = DateTime.UtcNow;

    }
}

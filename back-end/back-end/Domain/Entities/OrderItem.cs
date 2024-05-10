using back_end.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace back_end.Domain.Entities
{
    public class OrderItem
    {
        [Key]
        public Guid OrderItemId { get; set; } = Guid.NewGuid();

        [Required]
        [ForeignKey("Order")]
        public Guid OrderId { get; set; }

        [JsonIgnore]
        public Order? Order { get; set; }

        [Required]
        [ForeignKey("Product")]
        public Guid ProductId { get; set; }

        [JsonIgnore]
        public Product? Product { get; set; }

        [Required]
        public string Rate { get; set; }

        [Required]
        public OrderStatus OrderItemStatus { get; set; }

        public DateTime CreateDate { get; set; }    = DateTime.UtcNow;

        public DateTime UpdateDate { get; set; } = DateTime.UtcNow;
    }
}

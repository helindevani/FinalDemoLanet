using back_end.Domain.Entities;
using back_end.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace back_end.DTO
{
    public class BookingDTO
    {
        public string BookingId { get; set; }=Guid.NewGuid().ToString();
        public string LpgNo { get; set; }

        public string ConsumerName { get; set; }

        public string PhoneNumber { get; set; }

        public string EmailId { get; set; }

        public string? ProductID { get; set; }
        public long Price { get; set; }

        public string? PaymentType { get; set; }
        public string? PaymentStatus { get; set; }
        public string? PaymentId { get; set; }

        public string ShippingAddress { get; set; }

        public string CreatedBy { get; set; }
    }
}

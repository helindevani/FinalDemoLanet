using back_end.Enums;

namespace back_end.DTO
{
    public class OrderDTO
    {
        public string? OrderId { get; set; }
        public string LpgNo { get; set; }
        public string ClientName { get; set; }

        public string ClientContact { get; set; }

        public string ClientEmail { get; set; }
        public string? ProductId { get; set; }
        public string? StaffId { get; set; }
        public bool?  IsStaffAccepted { get; set; }
        public string BookingId { get; set; }
        public string Amount { get; set; }
        public string PaymentType { get; set; }
        public string PaymentStatus { get; set; }
        public string CreatedBy { get; set; }
        public string Address { get; set; }
        public string? OrderStatus { get; set; }
    }
}

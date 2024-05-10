using back_end.Enums;

namespace back_end.DTO
{
    public class ProductDTO
    {
        public string? ProductId { get; set; }
        public string ProductName { get; set; }
        public IFormFile? ProductImage { get; set; }
        public string BrandId { get; set; }
        public string CategoryId { get; set; }
        public string Quantity { get; set; }
        public string UnitPrice { get; set; }
        public string Status { get; set; }
        public string CreatedBy { get; set; }
    }
}

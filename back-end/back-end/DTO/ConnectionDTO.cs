using back_end.Domain.Entities;
using back_end.Enums;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace back_end.DTO
{
    public class ConnectionDTO
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Gender { get; set; }

        public string MaritalStatus { get; set; }

        public DateTime Dob {  get; set; }
        public string Nationality { get; set; }

        public string RelatedType { get; set; }

        public string RelatedFirstName { get; set; }

        public string RelatedLastName { get; set; }

        public string Address { get; set; }

        public string District { get; set; }

        public string State { get; set; }

        public string PinCode { get; set; }

        public string ProductId { get; set; }

        public string EmailId { get; set; }

        public string PhoneNumber { get; set; }
        public string POIName { get; set; }
        public string POINo { get; set; }
        public IFormFile POI { get; set; }

        public string POAName { get; set; }
        public string POANo { get; set; }

        public IFormFile POA { get; set; }

        public IFormFile PhotoGraph { get; set; }

        public bool IsPNG { get; set; }

        public bool IsGovScheme { get; set; }

        public string? AadharCardNo { get; set; }

        public string RationState { get; set; }

        public string RationCardNumber { get; set; }
        public string UserId { get; set; }
    }
}

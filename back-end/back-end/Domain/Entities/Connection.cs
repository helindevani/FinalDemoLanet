using back_end.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace back_end.Domain.Entities
{
    public class Connection
    {
        [Key]
        public string LpgNo { get; set; } 

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Gender { get; set; }

        public string MaritalStatus { get; set; }

        public DateTime Dob { get; set; }
        public string Nationality { get; set; }

        public RelatedType RelatedType { get; set; }

        public string RelatedFirstName { get; set; }

        public string RelatedLastName { get; set; }

        public string Address { get; set; }

        public string District { get; set; }

        public string State { get; set; }

        public string PinCode { get; set; }

        [ForeignKey("Product")]
        public Guid ProductId { get; set; }

        public Product? Product { get; set; }

        public string EmailId { get; set; }

        public string PhoneNumber { get; set; }

        public string POIName { get; set; }
        public string POINo {  get; set; }

        public string POI { get; set; }
        public string POAName { get; set; }
        public string POANo { get; set; }
        public string POA { get; set; }
        public string PhotoGraph { get; set; }

        public bool IsPNG { get; set; }

        public bool IsGovScheme { get; set; }

        public string? AadharCardNo {  get; set; }

        public string RationState { get; set; }

        public string RationCardNumber { get; set; }

        public bool IsDeclarationAccept { get; set; } = true;

        public ConnectionStatus Status { get; set; } = ConnectionStatus.Pending;

        public DateTime CreatedDate { get; set; }= DateTime.UtcNow;
        public DateTime UpdateDate { get; set; } = DateTime.UtcNow;

        public Guid UserId { get; set; }

    }
}
    
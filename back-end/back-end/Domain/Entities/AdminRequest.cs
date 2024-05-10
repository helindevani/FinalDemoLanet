using back_end.Domain.Identity;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using back_end.Enums;

namespace back_end.Domain.Entities
{
    public class AdminRequest
    {
        [Key]
        public Guid RequestId { get; set; } = Guid.NewGuid();

        [Required]
        public string? Description { get; set;}

        [Required]
        [ForeignKey("AspNetUsers")]
        public Guid Id { get; set; }

        public ApplicationUser? User { get; set; } 

        public string? Remark {  get; set; }

        [Required]
        public RequestStatus Status { get; set; } = RequestStatus.Pending;

        [Required]
        public RequestType RequestTypeName { get; set;}

        [Required]
        public DateTime? RequestDate { get; set; }=DateTime.UtcNow;
    }
}

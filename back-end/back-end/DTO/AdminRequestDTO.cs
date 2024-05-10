using back_end.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.DTO
{
    public class AdminRequestDTO
    {

       
        public string? Description { get; set; }
        [Required]
        public Guid Id { get; set; }
        [Required]
        public string RequestTypeName { get; set; }
    }
}

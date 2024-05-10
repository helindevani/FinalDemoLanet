using back_end.Domain.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.Domain.Entities
{
    public class Notification
    {
        [Key]
        public Guid NotificationId { get; set; } = Guid.NewGuid();

        [Required]
        [ForeignKey("AspNetUsers")]
        public Guid Id { get; set; }// Foreign key to the user who will receive the notification
        public ApplicationUser? User { get; set; }
        public string Message { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public bool IsRead { get; set; }

    }
}

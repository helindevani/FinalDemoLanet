using back_end.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace back_end.Domain.Identity
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public string Name { get; set; }
        public bool IsHasConnection { get; set; }
        public bool IsHasConnectionLinked { get; set; }
        public string? FcsToken { get; set; }
        public string? ProfileImage {  get; set; }
    }
}

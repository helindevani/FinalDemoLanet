using back_end.Domain.Identity;
using back_end.DTO;

namespace back_end.ServiceContracts
{
    public interface IJwtService
    {
        AuthenticationResponse CreateJwtToken(ApplicationUser user, List<string> roles);
    }
}

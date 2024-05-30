using back_end.Domain.Entities;
using back_end.DTO;
using System.Security.Claims;

namespace back_end.ServiceContracts.Repository
{
    public class PagedBookingResult<T>
    {
        public List<T> PagedBookings { get; set; }
        public int TotalBookings { get; set; }
    }
    public interface IBookingRepository
    {
        Task<Booking> CreateBookingAsync(BookingDTO bookingDTO, ClaimsPrincipal user);
        Task<PagedBookingResult<Booking>> GetBookingsAsync(bool history, int page, int pageSize, string search = null);
        Task<Booking> GetBookingByIdAsync(Guid id);
        Task<Booking> GetBookingsByUserIdAsync(ClaimsPrincipal user);
        Task<bool> DeleteBookingAsync(Guid id);
        Task<(decimal?, IEnumerable<Connection>)> GetApprovedConnectionsAsync(ClaimsPrincipal user);
        Task<string> CreateCheckoutSessionAsync(BookingDTO booking);
        Task<Booking> GetLatestBookingAsync(ClaimsPrincipal user);
        Task<Order> GetOrderByBookingIdAsync(Guid bookingId);
        Task<List<Staff>> GetStaffsAsync();
    }
}

using back_end.Domain.Entities;
using back_end.DTO;
using System.Security.Claims;

namespace back_end.ServiceContracts.Repository
{
    public class PagedOrdersResult<T>
    {
        public List<T> PagedOrders { get; set; }
        public int TotalOrders { get; set; }
    }
    public interface IOrderRepository
    {
        Task<PagedOrdersResult<Order>> GetOrders(bool history, int page, int pageSize, string search = null);
        Task<PagedOrdersResult<Order>> GetUserOrders(ClaimsPrincipal user, int page, int pageSize, string search = null);
        Task<Order> GetOrder(Guid id);
        Task<PagedOrdersResult<Order>> GetOrdersByStaff(bool history, ClaimsPrincipal user, int page, int pageSize, string search = null);
        Task<Order> UpdateOrder(ClaimsPrincipal user,Guid id, OrderDTO orderDTO);
        Task<Order> CreateOrder(OrderDTO orderDTO, ClaimsPrincipal user);
        Task<bool> DeleteOrder(Guid id);
    }
}

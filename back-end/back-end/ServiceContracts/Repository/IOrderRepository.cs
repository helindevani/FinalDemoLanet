using back_end.Domain.Entities;
using back_end.DTO;
using System.Security.Claims;

namespace back_end.ServiceContracts.Repository
{
    public interface IOrderRepository
    {
        Task<IEnumerable<Order>> GetOrders(bool history);
        Task<Order> GetOrder(Guid id);
        Task<IEnumerable<Order>> GetOrdersByStaff(bool history, ClaimsPrincipal user);
        Task<Order> UpdateOrder(Guid id, OrderDTO orderDTO);
        Task<Order> CreateOrder(OrderDTO orderDTO, ClaimsPrincipal user);
        Task<bool> DeleteOrder(Guid id);
    }
}

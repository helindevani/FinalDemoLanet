using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.DTO;
using back_end.Enums;
using Microsoft.AspNetCore.Authorization;
using back_end.ServiceContracts;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using back_end.ServiceContracts.Repository;
using back_end.Repositories;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailSenderService _emailSender;
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;

        public OrdersController(ApplicationDbContext context, IEmailSenderService emailSender,IOrderRepository orderRepository,IProductRepository productRepository)
        {
            _context = context;
            _emailSender = emailSender;
            _orderRepository = orderRepository;
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders([FromQuery]bool history, int page, int pageSize, string search = null)
        {
          var result = await _orderRepository.GetOrders(history,page,pageSize,search);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(Guid id)
        {
            return await _orderRepository.GetOrder(id);
        }

        [HttpGet("Staff")]
        public async Task<ActionResult<Order>> GetOrderByStaff([FromQuery] bool history, int page, int pageSize, string search = null)
        {
            var result = await _orderRepository.GetOrdersByStaff(history, User,page,pageSize,search);

            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Order>> PutOrder(Guid id,OrderDTO orderDTO)
        {
            var result = await _orderRepository.UpdateOrder(id, orderDTO);
            return result;

        }

        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(OrderDTO orderDTO)
        {
            var order = await _orderRepository.CreateOrder(orderDTO, User);

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
           bool result= await _orderRepository.DeleteOrder(id);
            if (!result)
            {
                return BadRequest();
            }

            return Ok();
        }

    }
}

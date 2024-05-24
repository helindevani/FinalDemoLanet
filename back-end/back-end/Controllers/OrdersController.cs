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

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class OrdersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailSenderService _emailSender;

        public OrdersController(ApplicationDbContext context, IEmailSenderService emailSender)
        {
            _context = context;
            _emailSender = emailSender;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders([FromQuery]bool history)
        {
          if (_context.Orders == null)
          {
              return NotFound();
          }

            List<Order> orders;
            if (history)
            {
                orders = await _context.Orders
               .Include(r => r.Booking)
               .Include(p=>p.Booking.Product)
               .Include(p => p.Booking.Product.Brand)
               .Include(s => s.Staff)
               .Where(r => r.OrderStatus == OrderStatus.Delivered || r.OrderStatus == OrderStatus.Rejected)
               .ToListAsync();
            }
            else
            {
                orders = await _context.Orders
                .Include(r => r.Booking)
                .Include(p => p.Booking.Product)
                .Include(p => p.Booking.Product.Brand)
                .Include(s => s.Staff)
                .Where(r => r.OrderStatus == OrderStatus.Placed || r.OrderStatus == OrderStatus.Confirmed || r.OrderStatus == OrderStatus.OnTheWay)
                .ToListAsync();
            }

            return Ok(orders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(Guid id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }

            var order = await _context.Orders
                .Include(r => r.Booking)
                    .ThenInclude(b => b.Product)
                        .ThenInclude(p => p.Brand)
                .FirstOrDefaultAsync(i => i.OrderId == id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }


        [HttpPost("{id}")]
        public async Task<ActionResult<Order>> StaffAction(Guid id,bool status)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }

            var order = await _context.Orders.FirstOrDefaultAsync(r => r.OrderId == id);

            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            var userId = userIdClaim.Value;

            if (status)
            {
                order.IsStaffAccepted = true;
                order.OrderStatus = OrderStatus.Confirmed;
                order.UpdatedBy=Guid.Parse(userId);

            }
            else
            {
                order.IsStaffAccepted = false;
                order.UpdatedBy = Guid.Parse(userId);
            }
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
            return Ok(status ? "Order Accepted" : "Order Not Accepted");
        }

        [HttpGet("Staff")]
        public async Task<ActionResult<Order>> GetOrderByStaff()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }

            var userId = userIdClaim.Value;

            var orders = await _context.Orders.Where(o => o.StaffId.ToString() == userId).Where(o=>o.IsStaffAccepted != false).ToListAsync();

            if (orders == null || orders.Count == 0)
            {
                return NotFound("No orders found for the current user.");
            }

            return Ok(orders);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Order>> PutOrder(Guid id,OrderDTO orderDTO)
        {
            if (id.ToString() != orderDTO.OrderId)
            {
                return BadRequest();
            }
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
           
            if (userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }
            var userId = userIdClaim.Value;

            if (_context.Orders == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Orders'  is null.");
            }
            if (!Enum.TryParse(typeof(PaymentType), orderDTO.PaymentType.ToString(), out var paymenttype))
            {
                return BadRequest("Invalid Payment Type.");
            }
            if (!Enum.TryParse(typeof(PaymentStatus), orderDTO.PaymentStatus.ToString(), out var paymentstatus))
            {
                return BadRequest("Invalid Payment status.");
            }

            if (!Enum.TryParse(typeof(OrderStatus), orderDTO.OrderStatus.ToString(), out var orderStatus))
            {
                return BadRequest("Invalid Order status.");
            }
            var existingOrder = await _context.Orders.Include(b=>b.Booking).FirstOrDefaultAsync(r=>r.OrderId == id);

            if (existingOrder == null)
            {
                BadRequest("No Any Order Will Be Found");
            }
            existingOrder.OrderStatus =  (OrderStatus)orderStatus;
            existingOrder.StaffId = Guid.Parse(orderDTO.StaffId);
            if(orderDTO.IsStaffAccepted != null)
            {
                existingOrder.IsStaffAccepted = true;
            }
            if(orderDTO.OrderStatus == "Delivered")
            {
                existingOrder.DeliveryDate = DateTime.UtcNow;
                if((PaymentType)paymenttype == PaymentType.COD)
                {
                    existingOrder.PaymentStatus = PaymentStatus.Success;
                    existingOrder.Booking.PaymentDate = DateTime.UtcNow;
                    existingOrder.Booking.PaymentId = "Cash Payment";
                    existingOrder.Booking.PaymentStatus = PaymentStatus.Success;
                }
            }
            await _context.SaveChangesAsync();
            return existingOrder;

        }

        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(OrderDTO orderDTO)
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if(userIdClaim == null)
            {
                return Unauthorized("User ID not found in token.");
            }
            var userId = userIdClaim.Value;

            if (_context.Orders == null)
            {
              return Problem("Entity set 'ApplicationDbContext.Orders'  is null.");
            }
            if (!Enum.TryParse(typeof(PaymentType), orderDTO.PaymentType.ToString(), out var paymenttype))
            {
                return BadRequest("Invalid Payment Type.");
            }
            if (!Enum.TryParse(typeof(PaymentStatus), orderDTO.PaymentStatus.ToString(), out var paymentstatus))
            {
                return BadRequest("Invalid Payment status.");
            }
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId.ToString() == orderDTO.ProductId);
            if (product == null)
            {
                return BadRequest("Product not available.");
            }
            if (!int.TryParse(product.Quantity, out int quantity))
            {
                return BadRequest("Quantity type is not correct.");
            }
            if (quantity <= 0)
            {
                return BadRequest("Stock is empty. Please try again later.");
            }
            var order = new Order
            {
                ClientName=orderDTO.ClientName,
                ClientEmail=orderDTO.ClientEmail,
                ClientContact=orderDTO.ClientContact,
                BookingId= Guid.Parse(orderDTO.BookingId),
                Amount=orderDTO.Amount,
                CreatedBy= Guid.Parse(userId),
                UpdatedBy = Guid.Parse(userId),
                LpgNo =orderDTO.LpgNo,
                PaymentType=(PaymentType)paymenttype,
                PaymentStatus=(PaymentStatus)paymentstatus,
                Address=orderDTO.Address,
                StaffId=Guid.Parse(orderDTO.StaffId),
                OrderStatus = OrderStatus.Placed,
            };
            product.Quantity = (quantity - 1).ToString();

            var booking = await _context.Bookings.FirstOrDefaultAsync(r => r.BookingId.ToString() == orderDTO.BookingId);
            if(booking != null)
            {
                booking.Status = BookingStatus.Confirmed;
            }

            _context.Bookings.Update(booking);
            _context.Products.Update(product);
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            string emailContent = $"Your Booking Request According To Your Order Will Be Placed And Assign Delivery Boy!!!:<br><br>" +
                                  $"Order ID: {order.OrderId}<br>" +
                                  $"LPG No : {order.LpgNo}<br>" +
                                  $"Booking Date: {order.Booking.BookingDate}<br>" +
                                  $"Order Date: {order.OrderDate}<br>" +
                                  $"Customer Address: {order.Address}<br>";

            await _emailSender.SendEmailAsync(order.ClientEmail, "You Order Placed Successfully", emailContent);

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(Guid id)
        {
            if (_context.Orders == null)
            {
                return NotFound();
            }
            var order = await _context.Orders.FindAsync(id);
            var booking = await _context.Bookings.FirstOrDefaultAsync(r => r.BookingId == order.BookingId);
            booking.Status = BookingStatus.Pending;
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == booking.ProductID);
            if (product == null)
            {
                return BadRequest("Product not available.");
            }
            if (!int.TryParse(product.Quantity, out int quantity))
            {
                return BadRequest("Quantity type is not correct.");
            }
            if (order == null)
            {
                return BadRequest();
            }
            product.Quantity = (quantity + 1).ToString();

            _context.Orders.Remove(order);
            _context.Bookings.Update(booking);
            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            return Ok("Data Successfully Deleted");
        }

        private bool OrderExists(Guid id)
        {
            return (_context.Orders?.Any(e => e.OrderId == id)).GetValueOrDefault();
        }
    }
}

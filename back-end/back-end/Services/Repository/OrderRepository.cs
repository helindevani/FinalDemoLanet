using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.Domain.Identity;
using back_end.DTO;
using back_end.Enums;
using back_end.ServiceContracts;
using back_end.ServiceContracts.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace back_end.Services.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSenderService _emailSenderService;
        private readonly INotificationService _notificationService;

        public OrderRepository(ApplicationDbContext context,IEmailSenderService emailSenderService,UserManager<ApplicationUser> userManager,INotificationService notificationService)
        {
            _context = context;
            _emailSenderService = emailSenderService;
            _userManager = userManager;
            _notificationService = notificationService;
        }
        public async Task<PagedOrdersResult<Order>> GetOrders(bool history, int page, int pageSize, string search = null)
        {
            IQueryable<Order> ordersQuery = _context.Orders
             .Include(r => r.Booking)
             .Include(p => p.Booking.Product)
             .Include(p => p.Booking.Product.Brand)
             .Include(s => s.Staff);

            if (history)
            {
                ordersQuery = ordersQuery.Where(r => r.OrderStatus == OrderStatus.Delivered || r.OrderStatus == OrderStatus.Rejected);
            }
            else
            {
                ordersQuery = ordersQuery.Where(r => r.OrderStatus == OrderStatus.Placed || r.OrderStatus == OrderStatus.Confirmed || r.OrderStatus == OrderStatus.OnTheWay || r.OrderStatus == OrderStatus.StaffRejected);
            }

            if (!string.IsNullOrEmpty(search))
            {
                var searchLower = search.ToLower();
                ordersQuery = ordersQuery.Where(r => r.LpgNo.ToLower().Contains(searchLower));
            }
            var totalOrders = await ordersQuery.CountAsync();

            var pagedOrders = await ordersQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedOrdersResult<Order>
            {
                PagedOrders = pagedOrders,
                TotalOrders = totalOrders
            };
        }

        public async Task<PagedOrdersResult<Order>> GetUserOrders(ClaimsPrincipal user, int page, int pageSize, string search = null)
        {
            IQueryable<Order> ordersQuery = _context.Orders
             .Include(r => r.Booking)
             .Include(p => p.Booking.Product)
             .Include(p => p.Booking.Product.Brand)
             .Include(s => s.Staff);

            var userIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User ID not found in token.");
            }

            var userId = userIdClaim.Value;
            var userData = await _userManager.FindByIdAsync(userId);

            ordersQuery = ordersQuery.Where(r => r.OrderStatus == OrderStatus.Delivered && r.ClientEmail == userData.Email);

            if (!string.IsNullOrEmpty(search))
            {
                var searchLower = search.ToLower();
                ordersQuery = ordersQuery.Where(r => r.OrderId.ToString().ToLower().Contains(searchLower));
            }
            var totalOrders = await ordersQuery.CountAsync();

            var pagedOrders = await ordersQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedOrdersResult<Order>
            {
                PagedOrders = pagedOrders,
                TotalOrders = totalOrders
            };
        }

        public async Task<Order> GetOrder(Guid id)
        {
            var order = await _context.Orders
               .Include(r => r.Booking)
                   .ThenInclude(b => b.Product)
                       .ThenInclude(p => p.Brand)
               .FirstOrDefaultAsync(i => i.OrderId == id);

            if (order == null)
            {
                return null;
            }

            return order;
        }

        public async Task<PagedOrdersResult<Order>> GetOrdersByStaff(bool history, ClaimsPrincipal user, int page, int pageSize, string search = null)
        {
            var userIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User ID not found in token.");
            }

            var userId = userIdClaim.Value;

            IQueryable<Order> ordersQuery = _context.Orders
            .Include(r => r.Booking)
            .ThenInclude(b => b.Product)
                .ThenInclude(p => p.Brand)
                .Include(s => s.Staff)
                .Where(o => o.StaffId.ToString() == userId);

            if (history)
            {
                ordersQuery = ordersQuery.Where(o => o.OrderStatus == OrderStatus.Delivered);
            }
            else
            {
                ordersQuery = ordersQuery.Where(o => o.OrderStatus != OrderStatus.Delivered && o.OrderStatus != OrderStatus.StaffRejected);
            }

            if (!string.IsNullOrEmpty(search))
            {
                var searchLower = search.ToLower();
                ordersQuery = ordersQuery.Where(r => r.LpgNo.ToLower().Contains(searchLower));
            }

            var totalOrders = await ordersQuery.CountAsync();

            var pagedOrders = await ordersQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedOrdersResult<Order>
            {
                PagedOrders = pagedOrders,
                TotalOrders = totalOrders
            };
        }

        public async Task<Order> UpdateOrder(ClaimsPrincipal userdata,Guid id, OrderDTO orderDTO)
        {
            var userIdClaim = userdata.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User ID not found in token.");
            }

            var userdataId = userIdClaim.Value;
            if (id.ToString() != orderDTO.OrderId)
            {
                return null;
            }

            if (!Enum.TryParse(typeof(PaymentType), orderDTO.PaymentType.ToString(), out var paymenttype))
            {
                return null;
            }
            if (!Enum.TryParse(typeof(PaymentStatus), orderDTO.PaymentStatus.ToString(), out var paymentstatus))
            {
                return null;
            }

            if (!Enum.TryParse(typeof(OrderStatus), orderDTO.OrderStatus.ToString(), out var orderStatus))
            {
                return null;
            }

            var existingOrder = await _context.Orders.Include(b => b.Booking).FirstOrDefaultAsync(r => r.OrderId == id);
            if (existingOrder == null)
            {
                return null;
            }

            var admins = await _userManager.GetUsersInRoleAsync("Admin");
            var admin = admins.FirstOrDefault();

            var staffs = await _userManager.GetUsersInRoleAsync("Staff");
            var staff = staffs.FirstOrDefault();

            var user = await _userManager.FindByEmailAsync(orderDTO.ClientEmail);
            var staffEntity = await _context.Staffs.FirstOrDefaultAsync(s => s.StaffId.ToString() == orderDTO.StaffId);

            existingOrder.OrderStatus =(OrderStatus) orderStatus;
            existingOrder.StaffId = Guid.Parse(orderDTO.StaffId);

            if (orderDTO.IsStaffAccepted.HasValue)
            {
                bool isStaffAccepted = orderDTO.IsStaffAccepted.Value;
                if (isStaffAccepted && existingOrder.IsStaffAccepted != true)
                {
                    await NotifyOrderStatusAsync(admin, user, staffEntity, "successfully accepted");
                }
                else
                {
                    if (orderDTO.OrderStatus == "StaffRejected")
                    {

                        await NotifyOrderStatusAsync(admin, null, staffEntity, "rejected");
                    }
                }
                existingOrder.IsStaffAccepted = isStaffAccepted;
            }
            if ((OrderStatus)orderStatus == OrderStatus.Placed)
            {
                await _notificationService.SendNotificationAsync(staff.FcsToken, "New Order Assign", $"New Order Of This {orderDTO.LpgNo} Is Assign You!!");
            }
            if ((OrderStatus)orderStatus == OrderStatus.Confirmed && orderDTO.IsStaffAccepted == true)
            {
                await NotifyOrderStatusAsync(admin, user, staffEntity, "Confirmed");
            }

            if ((OrderStatus)orderStatus == OrderStatus.OnTheWay)
            {
                await NotifyOrderUpdateAsync(user, staff, "on the way");
            }

            if (orderDTO.OrderStatus == "Delivered")
            {
                existingOrder.DeliveryDate = DateTime.UtcNow;
                if ((PaymentType)paymenttype == PaymentType.COD)
                {
                    existingOrder.PaymentStatus = PaymentStatus.Success;
                    existingOrder.Booking.PaymentDate = DateTime.UtcNow;
                    existingOrder.Booking.PaymentId = "Cash Payment";
                    existingOrder.Booking.PaymentStatus = PaymentStatus.Success;
                }
                await NotifyOrderDeliveredAsync(user, admin, staffEntity, orderDTO.LpgNo);
            }

            await _context.SaveChangesAsync();
            return existingOrder;
        }

        private async Task NotifyOrderStatusAsync(ApplicationUser admin, ApplicationUser user, Staff staffEntity, string status)
        {
            if (admin != null)
            {
                await _notificationService.SendNotificationAsync(admin.FcsToken, "Order Status", $"Your assigned order will be {status} by {staffEntity.StaffName}");
            }
            if (user != null)
            {
                await _notificationService.SendNotificationAsync(user.FcsToken, "Order Status", $"Your order will be {status} by {staffEntity.StaffName}");
            }
        }

        private async Task NotifyOrderUpdateAsync(ApplicationUser user, ApplicationUser staff, string update)
        {
            if (user != null)
            {
                await _notificationService.SendNotificationAsync(user.FcsToken, "Order Update", $"Your order is {update}!!");
            }
            if (staff != null)
            {
                await _notificationService.SendNotificationAsync(staff.FcsToken, "Order Update", $"Your order is {update}!!");
            }
        }

        private async Task NotifyOrderDeliveredAsync(ApplicationUser user, ApplicationUser admin, Staff staffEntity, string lpgNo)
        {
            if (user != null)
            {
                await _notificationService.SendNotificationAsync(user.FcsToken, "Order Delivered", $"Your order of LPG No: {lpgNo} has been successfully delivered!!");
            }
            if (admin != null)
            {
                await _notificationService.SendNotificationAsync(admin.FcsToken, "Order Delivered", $"Your order of LPG No: {lpgNo} has been successfully delivered by {staffEntity.StaffName}!!");
            }
        }

        public async Task<Order> CreateOrder(OrderDTO orderDTO, ClaimsPrincipal user)
        {
            var userIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User ID not found in token.");
            }
            var userData = await _userManager.FindByEmailAsync(orderDTO.ClientEmail);
            var userId = userIdClaim.Value;

            var staffs = await _userManager.GetUsersInRoleAsync("Staff");
            var staffEmail = staffs.FirstOrDefault().Email;
            var staffdata = await _userManager.FindByEmailAsync(staffEmail);

            if (_context.Orders == null)
            {
                return null;
            }
            if (!Enum.TryParse(typeof(PaymentType), orderDTO.PaymentType.ToString(), out var paymenttype))
            {
                return null;
            }
            if (!Enum.TryParse(typeof(PaymentStatus), orderDTO.PaymentStatus.ToString(), out var paymentstatus))
            {
                return null;
            }
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId.ToString() == orderDTO.ProductId);
            if (product == null)
            {
                return null;
            }
            if (!int.TryParse(product.Quantity, out int quantity))
            {
                return null;
            }
            if (quantity <= 0)
            {
                return null;
            }
            var order = new Order
            {
                ClientName = orderDTO.ClientName,
                ClientEmail = orderDTO.ClientEmail,
                ClientContact = orderDTO.ClientContact,
                BookingId = Guid.Parse(orderDTO.BookingId),
                Amount = orderDTO.Amount,
                CreatedBy = Guid.Parse(userId),
                UpdatedBy = Guid.Parse(userId),
                LpgNo = orderDTO.LpgNo,
                PaymentType = (PaymentType)paymenttype,
                PaymentStatus = (PaymentStatus)paymentstatus,
                Address = orderDTO.Address,
                StaffId = Guid.Parse(orderDTO.StaffId),
                OrderStatus = OrderStatus.Placed,
            };
            product.Quantity = (quantity - 1).ToString();

            var booking = await _context.Bookings.FirstOrDefaultAsync(r => r.BookingId.ToString() == orderDTO.BookingId);
            if (booking != null)
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

            await _emailSenderService.SendEmailAsync(order.ClientEmail, "You Order Placed Successfully", emailContent);
            await _notificationService.SendNotificationAsync(userData.FcsToken, "Booking Update", $"Your Booking Of LPG No: {order.LpgNo} Number Is Confirmed");
            await _notificationService.SendNotificationAsync(staffdata.FcsToken, "New Order Assigned", $"You Have Receive LPG No: {order.LpgNo} Number Order For Delivery");
            return order;
        }

        public async Task<bool> DeleteOrder(Guid id)
        {
            if (_context.Orders == null)
            {
                return false;
            }
            var order = await _context.Orders.FindAsync(id);
            var booking = await _context.Bookings.FirstOrDefaultAsync(r => r.BookingId == order.BookingId);
            booking.Status = BookingStatus.Pending;
            var product = await _context.Products.FirstOrDefaultAsync(p => p.ProductId == booking.ProductID);
            if (product == null)
            {
                return false;
            }
            if (!int.TryParse(product.Quantity, out int quantity))
            {
                return false;
            }
            if (order == null)
            {
                return false;
            }
            product.Quantity = (quantity + 1).ToString();

            _context.Orders.Remove(order);
            _context.Bookings.Update(booking);
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
            return true;
        }
 
    }
}

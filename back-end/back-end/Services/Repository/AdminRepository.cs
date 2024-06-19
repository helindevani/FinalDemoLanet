using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.Domain.Identity;
using back_end.Enums;
using back_end.ServiceContracts;
using back_end.ServiceContracts.Repository;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe.Climate;
using System.Security.Claims;

namespace back_end.Services.Repository
{
    public class AdminRepository : IAdminRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly INotificationService _notificationService;
        private readonly IEmailSenderService _emailSenderService;

        public AdminRepository(ApplicationDbContext context, UserManager<ApplicationUser> userManager, INotificationService notificationService, IEmailSenderService emailSenderService)
        {
            _context = context;
            _userManager = userManager;
            _notificationService = notificationService;
            _emailSenderService = emailSenderService;
        }

        public Dictionary<string, int> GetDashboardCounts()
        {
            Dictionary<string, int> data = new Dictionary<string, int>();

            try
            {
                int TotalCylinder = _context.Products.Count();
                int TotalSupplier = _context.Brands.Count();
                int TotalBooking = _context.Bookings.Count();
                var bookings = _context.Bookings.ToList();

                int TotalRevenue = bookings.Sum(b =>
                {
                    int price;
                    return int.TryParse(b.Price, out price) ? price : 0;
                });

                data.Add("TotalCylinder", TotalCylinder);
                data.Add("TotalSupplier", TotalSupplier);
                data.Add("TotalBooking", TotalBooking);
                data.Add("TotalRevenue", TotalRevenue);

                return data;
            }
            catch (Exception ex)
            {
                // Log the exception
                throw new Exception("Failed to retrieve dashboard counts", ex);
            }
        }


        public async Task<List<Booking>> GetUserWiseBookingsAsync()
        {
            var bookings = await _context.Bookings
                                         .OrderByDescending(b => b.BookingDate)
                                         .ToListAsync();
            return bookings;
        }


        public async Task<byte[]> OrderReport(DateTime startDate, DateTime endDate)
        {
            var orders = await _context.Orders
         .Where(order => order.OrderDate >= startDate && order.OrderDate <= endDate)
         .Include(order => order.Booking)
         .ThenInclude(booking => booking.Product)
         .ThenInclude(product => product.Brand)
         .ToListAsync();

            using (var ms = new MemoryStream())
            {
                var document = new Document();
                PdfWriter.GetInstance(document, ms);
                document.Open();

                var table = new PdfPTable(3); // Number of columns
                table.AddCell("Order Date");
                table.AddCell("Product Name");
                table.AddCell("Amount");

                // Add orders to the PDF table
                foreach (var order in orders)
                {
                    table.AddCell(order.OrderDate.ToString("dd-mm-yyyy"));
                    table.AddCell(order.Booking.Product.Brand.BrandName);
                    table.AddCell(order.Amount.ToString());
                }

                document.Add(table);
                document.Close();

                var byteArray = ms.ToArray();
                return byteArray;
            }
        }

        public async Task<IActionResult> UpdateConnectionStatus(ClaimsPrincipal userdata,string lpgNo, string status)
        {
            var connectionForm = await _context.Connections.FirstOrDefaultAsync(r => r.LpgNo == lpgNo);
            var user1 = await _userManager.FindByIdAsync(connectionForm.UserId.ToString());
            var user = await _userManager.FindByIdAsync(connectionForm.UserId.ToString());

            var approverUserId = userdata.FindFirstValue(ClaimTypes.NameIdentifier);

            if (connectionForm == null)
            {
                return new NotFoundResult();
            }

            if (status == ConnectionStatus.Approved.ToString())
            {
                var isRationCardUnique = _context.Connections
                    .Where(f => f.RationCardNumber == connectionForm.RationCardNumber)
                    .Count() == 1;

                if (isRationCardUnique)
                {
                    connectionForm.Status = ConnectionStatus.Approved;
                    await _context.SaveChangesAsync();

                    string emailContent = $"Your Connection Request Approved Successfully!!!:<br><br>" +
                                 $"LPG No : {lpgNo}<br>";
                    await _emailSenderService.SendEmailAsync(connectionForm.EmailId, "Connection Update", emailContent);
                    await _notificationService.SendNotificationAsync(user1.FcsToken, "Connection Status", $"Connection {status}!!");
                    return new OkObjectResult("Connection status approved successfully.");
                }
                else
                {
                    await _notificationService.SendNotificationAsync(user1.FcsToken, "Connection Status", $"Connection Rejected Due To Already Have Connection!!");
                    return new OkObjectResult("This User Is Already Have Connection");
                }
            }
            else
            {
                connectionForm.Status = ConnectionStatus.Rejected;

                if (connectionForm.Status == ConnectionStatus.Rejected)
                {
                    user.IsHasConnection = false;
                    await _userManager.UpdateAsync(user);
                }
                _context.Connections.Remove(connectionForm);
                await _context.SaveChangesAsync();
                await _notificationService.SendNotificationAsync(user1.FcsToken, "Connection Status", $"Connection {status}!!");
                return new OkObjectResult("Connection status rejected due to You Have Already Hold Gas Connection.");
            }
        }
    }
}

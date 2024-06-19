using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.Domain.Identity;
using back_end.Enums;
using back_end.ServiceContracts;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.IO;

namespace back_end.Services
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IEmailSenderService _emailService;
        private readonly INotificationService _notificationService;

        public UserRepository(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IEmailSenderService emailService, INotificationService notificationService)
        {
            _context = context;
            _userManager = userManager;
            _emailService = emailService;
            _notificationService = notificationService;
        }

        public async Task<IActionResult> AppliedNewConnection(ClaimsPrincipal user)
        {
            var userIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                return new UnauthorizedObjectResult("User ID not found in token.");
            }

            var userId = userIdClaim.Value;
            var appUser = await _userManager.FindByIdAsync(userId);

            if (appUser.IsHasConnection)
            {
                var connectionForm = _context.Connections.FirstOrDefault(r => r.UserId.ToString() == userId);

                if (connectionForm.Status == ConnectionStatus.Pending)
                {
                    return new OkObjectResult(new
                    {
                        Status = "Pending",
                        LPGNo = connectionForm.LpgNo
                    });
                }
                else if (connectionForm.Status == ConnectionStatus.Rejected)
                {
                    return new OkObjectResult(new
                    {
                        Status = "Rejected",
                        LPGNo = connectionForm.LpgNo
                    });
                }
                else
                {
                    return new OkObjectResult(new
                    {
                        Status = "Success",
                        LPGNo = connectionForm.LpgNo
                    });
                }
            }

            return new NoContentResult();
        }

        public async Task<bool> IsGivenRating(Guid id)
        {
            var order = await _context.Orders.FirstOrDefaultAsync(o => o.OrderId == id);
            if (order == null)
            {
                throw new Exception("Order Not Found");
            }
            if (order.staffRating == null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<IActionResult> LinkConnection(ClaimsPrincipal user, string LpgNo)
        {
            var userIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User ID not found in token.");
            }

            var userId = userIdClaim.Value;
            var userdata = await _userManager.FindByIdAsync(userId);
            var connection = _context.Connections.FirstOrDefault(r => r.LpgNo == LpgNo);

            if (userdata.IsHasConnectionLinked)
            {
                return new BadRequestObjectResult("User was already linked to an account with the system.");
            }

            if (connection != null)
            {
                if (userdata.Id == connection.UserId && connection.Status == ConnectionStatus.Approved)
                {
                    userdata.IsHasConnectionLinked = true;
                    await _userManager.UpdateAsync(userdata);
                    var message = $"Your LPG Connection No {connection.LpgNo} is linked with {userdata.Name} account successfully.";
                    await _emailService.SendEmailAsync(userdata.Email, "Link Connection", message);
                    await _context.SaveChangesAsync();
                    return new OkObjectResult("User was linked successfully to his account.");
                }
            }

            return new BadRequestObjectResult("User was not linked with the system.");
        }

        public async Task<IActionResult> StaffRating(Guid id, int rating)
        {
            if (rating < 1 || rating > 5)
            {
                throw new Exception("Invalid rating. Rating should be between 1 and 5.");
            }

            var order = await _context.Orders.FirstOrDefaultAsync(c => c.OrderId == id);
            if (order == null)
            {
                throw new Exception("Order not found.");
            }

            var staff = await _context.Staffs.FirstOrDefaultAsync(c => c.StaffId == order.StaffId);
            if (staff == null)
            {
                throw new Exception("Staff not found.");
            }

            if (order.staffRating == null)
            {
                order.staffRating = 0;
            }

            if (staff.Rating == null && staff.RatingQuantity == null)
            {
                staff.RatingQuantity = 0;
                staff.Rating = 0;
            }

            int currentRatingSum = (int)(staff.Rating * staff.RatingQuantity);
            int newRatingSum = currentRatingSum + rating;
            int newRatingQuantity = (int)(staff.RatingQuantity + 1);
            int newRating = (int)newRatingSum / newRatingQuantity;

            staff.RatingQuantity = newRatingQuantity;
            staff.Rating = newRating;

            order.staffRating = rating;

            _context.Orders.Update(order);
            _context.Staffs.Update(staff);

            await _context.SaveChangesAsync();

            return new OkObjectResult("Staff rating updated successfully.");
        }

        public async Task<byte[]> DownloadInvoice(Order order)
        {


            using (var ms = new MemoryStream())
            {
                var document = new Document();
                PdfWriter.GetInstance(document, ms);
                document.Open();

                var table = new PdfPTable(3); // Number of columns
                table.AddCell("Order ID");
                table.AddCell("Product Name");
                table.AddCell("Amount");

         
                    table.AddCell(order.OrderId.ToString());
                table.AddCell(order.Booking.Product.Brand.BrandName);
                    table.AddCell(order.Amount.ToString());
   

                document.Add(table);
                document.Close();

                var byteArray = ms.ToArray();
                return byteArray;
            }

        }
    }
}

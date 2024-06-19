using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.Domain.Identity;
using back_end.Enums;
using back_end.ServiceContracts;
using Microsoft.AspNetCore.Identity;
using Stripe;
using Stripe.Checkout;
namespace back_end.Services
{
    public class StripeWebhookService : IStripeWebhookRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly INotificationService _notificationService;
        private readonly UserManager<ApplicationUser> _userManager;

        public StripeWebhookService(ApplicationDbContext context,INotificationService notificationService,UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
            _notificationService = notificationService;
        }

        public async Task HandleWebhookEvent(string json, string signature)
        {
            try
            {
                var stripeEvent = EventUtility.ConstructEvent(
                    json,
                    signature,
                    "whsec_ce25d4889702a7adf94ac741254d3ba6250604b3858b14d1cce13ae52b08ef5b"
                );
                var admins = await _userManager.GetUsersInRoleAsync("Admin");
                var adminEmail = admins.FirstOrDefault().Email;
                var admindata = await _userManager.FindByEmailAsync(adminEmail);

                if (stripeEvent.Type == Events.CheckoutSessionCompleted)
                {
                    var session = stripeEvent.Data.Object as Session;

                    var booking = new Booking
                    {
                        BookingId = Guid.Parse(session.ClientReferenceId),
                        ConsumerName = session.Metadata["ConsumerName"],
                        LpgNo = session.Metadata["LpgNo"],
                        EmailId = session.CustomerEmail,
                        PhoneNumber = session.Metadata["PhoneNumber"],
                        ProductID = Guid.Parse(session.Metadata["ProductID"]),
                        CreatedBy = session.Metadata["CreatedBy"],
                        ShippingAddress = session.Metadata["ShippingAddress"],
                        Price = session.Metadata["Price"],
                        PaymentType = PaymentType.Online,
                        PaymentStatus = PaymentStatus.Success,
                        PaymentDate = DateTime.UtcNow,
                        PaymentId = session.PaymentIntentId
                    };

                    _context.Bookings.Add(booking);
                    await _context.SaveChangesAsync();
                    await _notificationService.SendNotificationAsync(admindata.FcsToken, "New Booking", $"You Have Receive Booking Of LPG No: {booking.LpgNo} Number");
                }

            }
            catch (StripeException e)
            {
                // Log or handle the Stripe exception
                throw;
            }
        }
    }
}

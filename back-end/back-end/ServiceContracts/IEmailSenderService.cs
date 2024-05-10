namespace back_end.ServiceContracts
{
    public interface IEmailSenderService
    {
        Task SendEmailAsync(string email, string subject, string message);
    }
}

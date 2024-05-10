namespace back_end.DTO
{
    public class RegisterationResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public List<string> Errors { get; set; }
    }
}

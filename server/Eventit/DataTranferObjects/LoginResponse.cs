namespace Server.DataTranferObjects
{
    public class LoginResponse
    {
        public string AccessToken { get; set; } = null!;

        public string RefreshToken { get; set; } = null!;

        public string Role { get; set; } = null!;
    }
}

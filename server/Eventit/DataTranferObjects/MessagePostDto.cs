using Eventit.Models;

namespace Server.DataTranferObjects
{
    public class MessagePostDto
    {
        public string Text { get; set; } = null!;

        public int ChatId { get; set; }
    }
}

using Eventit.Models;

namespace Server.DataTranferObjects
{
    public class ChatDto
    {
        public int Id { get; set; }

        public bool IsPublic { get; set; }

        public ICollection<MessageDto> Messages { get; set; } = new List<MessageDto>();
    }
}

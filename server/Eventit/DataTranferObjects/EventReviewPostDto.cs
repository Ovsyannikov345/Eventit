using Eventit.Models;

namespace Server.DataTranferObjects
{
    public class EventReviewPostDto
    {
        public string Description { get; set; } = null!;

        public int Grade { get; set; }

        public int EventId { get; set; }
    }
}

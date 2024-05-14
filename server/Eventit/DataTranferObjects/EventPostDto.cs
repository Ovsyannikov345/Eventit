using Eventit.Models;

namespace Server.DataTranferObjects
{
    public class EventPostDto
    {
        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int? AgeRestriction { get; set; }

        public bool OnlineEvent { get; set; }

        public decimal? EntranceFee { get; set; }

        public bool Free { get; set; }

        public bool IsFinished { get; set; }

        public int? PlaceId { get; set; }
    }
}

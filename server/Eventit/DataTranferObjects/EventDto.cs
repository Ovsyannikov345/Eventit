using Eventit.DataTranferObjects;
using Eventit.Models;

namespace Server.DataTranferObjects
{
    public class EventDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public int? AgeRestriction { get; set; }

        public decimal? EntranceFee { get; set; }

        public DateTime CreationDate { get; set; }

        public bool IsFinished { get; set; }

        public CompanyDto Company { get; set; } = null!;

        public PlaceDto? Place { get; set; }
    }
}

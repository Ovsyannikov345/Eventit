using Eventit.Models;

namespace Eventit.DataTranferObjects
{
    public class PlaceReviewPostDto
    {
        public int Grade { get; set; }

        public int PlaceId { get; set; }

        public int? EventId { get; set; }
    }
}

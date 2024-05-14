using Eventit.Models;

namespace Eventit.DataTranferObjects
{
    public class PlaceReviewPostDto
    {
        public int Grade { get; set; }

        public int CompanyId { get; set; }

        public int PlaceId { get; set; }
    }
}

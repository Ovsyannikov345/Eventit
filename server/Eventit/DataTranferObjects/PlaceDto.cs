using Eventit.Models;

namespace Eventit.DataTranferObjects
{
    public class PlaceDto
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Address { get; set; } = null!;

        public ICollection<PlaceReviewDto> PlaceReviews { get; set; } = new List<PlaceReviewDto>();
    }
}

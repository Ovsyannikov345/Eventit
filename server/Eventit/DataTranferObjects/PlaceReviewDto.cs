using Eventit.Models;

namespace Eventit.DataTranferObjects
{
    public class PlaceReviewDto
    {
        public int Id { get; set; }

        public int Grade { get; set; }

        public int CompanyId { get; set; }

        public int? EventId { get; set; }

        public CompanyDto Company { get; set; } = null!;
    }
}

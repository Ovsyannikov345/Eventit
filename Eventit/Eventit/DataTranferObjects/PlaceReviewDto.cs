namespace Eventit.DataTranferObjects
{
    public class PlaceReviewDto
    {
        public int OrganizerId { get; set; }

        public int PlaceId { get; set; }

        public string Description { get; set; } = null!;

        public int Grade { get; set; }
    }
}

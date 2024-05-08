namespace Eventit.DataTranferObjects
{
    public class PlaceDto
    {
        public string Address { get; set; } = null!;

        public decimal Rating { get; set; }

        public int ReviewsCount { get; set; }
    }
}

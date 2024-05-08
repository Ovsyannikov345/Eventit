namespace Eventit.DataTranferObjects
{
    public class PlaceGetDto
    {
        public int Id { get; set; }

        public string Address { get; set; } = null!;

        public decimal Rating { get; set; }

        public int ReviewsCount { get; set; }
    }
}

using Eventit.DataTranferObjects;

namespace Server.DataTranferObjects
{
    public class EventReviewDto
    {
        public int Id { get; set; }

        public string Description { get; set; } = null!;

        public int Grade { get; set; }

        public UserDto User {get; set; } = null!;
    }
}

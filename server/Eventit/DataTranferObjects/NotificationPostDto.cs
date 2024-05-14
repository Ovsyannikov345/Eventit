using Eventit.Models;

namespace Server.DataTranferObjects
{
    public class NotificationPostDto
    {
        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        public int? UserId { get; set; }

        public int? CompanyId { get; set; }
    }
}

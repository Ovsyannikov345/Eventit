using Eventit.Models;

namespace Eventit.DataTranferObjects
{
    public class NotificationDto
    {
        public int Id { get; set; }

        public string Type { get; set; } = null!;

        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        public bool IsRead { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime ShowFrom { get; set; }

        public int? EventId { get; set; }
    }
}

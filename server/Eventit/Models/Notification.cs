using System;

namespace Eventit.Models
{
    public class Notification
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        public DateTime CreationDate { get; set; }

        public bool IsRead { get; set; }

        public int? UserId { get; set; }

        public virtual User? User { get; set; }

        public int? CompanyId { get; set; }

        public virtual Company? Company { get; set; }
    }
}

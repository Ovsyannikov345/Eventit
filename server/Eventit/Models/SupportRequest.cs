using System;

namespace Eventit.Models
{
    public class SupportRequest
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public DateTime CreationDate { get; set; }

        public int? UserId { get; set; }

        public virtual User? User { get; set; }

        public int? CompanyId { get; set; }

        public virtual Company? Company { get; set; }
    }
}
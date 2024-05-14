﻿using Eventit.Models;

namespace Eventit.DataTranferObjects
{
    public class NotificationDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string? Description { get; set; }

        public DateTime CreationDate { get; set; }

        public bool IsRead { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class Chat
{
    public int Id { get; set; }

    public bool IsPublic { get; set; }

    public int EventId { get; set; }

    public virtual Event Event { get; set; } = null!;

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();
}

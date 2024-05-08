using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class MessageSender
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? CompanyId { get; set; }

    public virtual Company? Company { get; set; }

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual User? User { get; set; }
}

using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class Message
{
    public int Id { get; set; }

    public string Text { get; set; } = null!;

    public DateTime CreationDate { get; set; }

    public int ChatId { get; set; }

    public virtual Chat Chat { get; set; } = null!;

    public int? UserId { get; set; }

    public virtual User? User { get; set; } = null!;

    public int? CompanyId { get; set; }

    public virtual Company? Company { get; set; }
}

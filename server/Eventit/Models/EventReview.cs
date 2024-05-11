using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class EventReview
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public int Grade { get; set; }

    public int EventId { get; set; }

    public virtual Event Event { get; set; } = null!;

    public int UserId { get; set; }

    public virtual User User { get; set; } = null!;
}

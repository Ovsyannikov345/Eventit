using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class PlaceReview
{
    public int OrganizerId { get; set; }

    public int PlaceId { get; set; }

    public string Description { get; set; } = null!;

    public int Grade { get; set; }

    public virtual Organizer Organizer { get; set; } = null!;

    public virtual Place Place { get; set; } = null!;
}

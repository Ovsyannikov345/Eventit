using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class PlaceReview
{
    public int Id { get; set; }

    public int Grade { get; set; }

    public int? EventId { get; set; }

    public int CompanyId { get; set; }

    public virtual Company Company { get; set; } = null!;

    public int PlaceId { get; set; }

    public virtual Place Place { get; set; } = null!;
}

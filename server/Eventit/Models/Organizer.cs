using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class Organizer
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? CompanyId { get; set; }

    public decimal Rating { get; set; }

    public int EventsCount { get; set; }

    public virtual Company? Company { get; set; }

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();

    public virtual ICollection<PlaceReview> PlaceReviews { get; set; } = new List<PlaceReview>();

    public virtual User? User { get; set; }
}

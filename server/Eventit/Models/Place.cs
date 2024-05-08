using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class Place
{
    public int Id { get; set; }

    public string Address { get; set; } = null!;

    public decimal Rating { get; set; }

    public int ReviewsCount { get; set; }

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();

    public virtual ICollection<PlaceReview> PlaceReviews { get; set; } = new List<PlaceReview>();
}

using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class Event
{
    public int Id { get; set; }

    public int OrganizerId { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public bool OnlineEvent { get; set; }

    public int? PlaceId { get; set; }

    public int AgeRestriction { get; set; }

    public decimal? EntranceFee { get; set; }

    public bool? Free { get; set; }

    public virtual Chat? Chat { get; set; }

    public virtual EventPhoto? EventPhoto { get; set; }

    public virtual ICollection<EventReview> EventReviews { get; set; } = new List<EventReview>();

    public virtual Organizer Organizer { get; set; } = null!;

    public virtual Place? Place { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}

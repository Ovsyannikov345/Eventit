using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class Event
{
    public int Id { get; set; }

    public string Title { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public int? AgeRestriction { get; set; }

    public decimal? EntranceFee { get; set; }

    public bool IsFinished { get; set; }
    
    public DateTime CreationDate { get; set; }

    public int CompanyId { get; set; }

    public virtual Company Company { get; set; } = null!;

    public int? PlaceId { get; set; }

    public virtual Place? Place { get; set; }

    public virtual Chat? Chat { get; set; }

    public virtual ICollection<User> Users { get; set; } = new List<User>();

    public virtual ICollection<EventReview> EventReviews { get; set; } = new List<EventReview>();
}

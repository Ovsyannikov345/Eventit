using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class Company
{
    public int Id { get; set; }

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Name { get; set; } = null!;

    public DateTime RegistrationDate { get; set; }

    public string RegistrationNumber { get; set; } = null!;

    public virtual CompanyContactPerson? CompanyContactPerson { get; set; }

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual ICollection<PlaceReview> PlaceReviews { get; set; } = new List<PlaceReview>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<SupportRequest> SupportRequests { get; set; } = new List<SupportRequest>();
}
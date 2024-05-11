using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class User
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? Patronymic { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public DateTime RegistrationDate { get; set; }

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();

    public virtual ICollection<Message> Messages { get; set; } = new List<Message>();

    public virtual ICollection<EventReview> EventReviews { get; set; } = new List<EventReview>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<SupportRequest> SupportRequests { get; set; } = new List<SupportRequest>();
}

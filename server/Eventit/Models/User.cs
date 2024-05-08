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

    public string Password { get; set; } = "";

    public DateTime? DateOfBirth { get; set; }

    public DateTime RegistrationDate { get; set; }

    public virtual ICollection<EventReview> EventReviews { get; set; } = new List<EventReview>();

    public virtual ICollection<MessageSender> MessageSenders { get; set; } = new List<MessageSender>();

    public virtual ICollection<Organizer> Organizers { get; set; } = new List<Organizer>();

    public virtual UserProfilePicture? UserProfilePicture { get; set; }

    public virtual ICollection<Event> Events { get; set; } = new List<Event>();
}

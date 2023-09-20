using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class Company
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string PhoneNumber { get; set; } = null!;

    public string Email { get; set; } = null!;

    public int Password { get; set; }

    public DateTime RegistrationDate { get; set; }

    public bool Verified { get; set; }

    public virtual CompanyContactPerson? CompanyContactPerson { get; set; }

    public virtual CompanyProfilePicture? CompanyProfilePicture { get; set; }

    public virtual ICollection<MessageSender> MessageSenders { get; set; } = new List<MessageSender>();

    public virtual ICollection<Organizer> Organizers { get; set; } = new List<Organizer>();
}

using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class CompanyContactPerson
{
    public int Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? Patronymic { get; set; }

    public string PhoneNumber { get; set; } = null!;

    public string Email { get; set; } = null!;

    public virtual Company IdNavigation { get; set; } = null!;
}

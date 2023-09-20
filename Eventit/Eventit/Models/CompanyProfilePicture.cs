using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class CompanyProfilePicture
{
    public int Id { get; set; }

    public byte[] Image { get; set; } = null!;

    public virtual Company IdNavigation { get; set; } = null!;
}

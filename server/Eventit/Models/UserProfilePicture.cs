using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class UserProfilePicture
{
    public int Id { get; set; }

    public byte[] Image { get; set; } = null!;

    public virtual User IdNavigation { get; set; } = null!;
}

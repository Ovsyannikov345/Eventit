using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class EventPhoto
{
    public int Id { get; set; }

    public byte[] Image { get; set; } = null!;

    public virtual Event IdNavigation { get; set; } = null!;
}

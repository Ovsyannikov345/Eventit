using System;
using System.Collections.Generic;

namespace Eventit.Models;

public partial class Message
{
    public int Id { get; set; }

    public int SenderId { get; set; }

    public int ChatId { get; set; }

    public string MessageText { get; set; } = null!;

    public DateTime SendingTime { get; set; }

    public virtual Chat Chat { get; set; } = null!;

    public virtual MessageSender Sender { get; set; } = null!;
}

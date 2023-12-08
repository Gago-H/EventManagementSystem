using EMS;
using System;
using System.Collections.Generic;

namespace EventManagement;

public partial class Event
{
    public int EventId { get; set; }

    public string Name { get; set; } = null!;

    public DateTime Date { get; set; }

    public virtual Participant? Participant { get; set; }
}

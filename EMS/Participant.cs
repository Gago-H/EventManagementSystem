using EventManagement;
using System;
using System.Collections.Generic;

namespace EMS;

public partial class Participant
{
    public int Id { get; set; }

    public int eId { get; set; }

    public string Fname { get; set; } = null!;

    public string Lname { get; set; } = null!;

    public string? Phone { get; set; }

    public string? Email { get; set; }

    public int EntryVal { get; set; }

    public int ExitVal { get; set; }

    public virtual Event IdNavigation { get; set; } = null!;
}

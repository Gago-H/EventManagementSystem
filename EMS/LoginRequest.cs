﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EMS
{
    public class LoginRequest
    {
        public required string UserName { get; set; } = null;
        public string Password { get; set; }
    }
}

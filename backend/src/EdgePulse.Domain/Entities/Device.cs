using System;
using System.Collections.Generic;
using System.Text;

namespace EdgePulse.Domain.Entities
{
    public class Device : BaseEntity
    {
        public string Name { get; set; } = string.Empty;

        public string SerialNumber { get; set; } = string.Empty;
    }
}

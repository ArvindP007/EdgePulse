using EdgePulse.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace EdgePulse.Domain.Entities
{
    public class Device : BaseEntity
    {
        public string Name { get; set; } = string.Empty;

        public string SerialNumber { get; set; } = string.Empty;

        public Guid CustomerId { get; set; }

        public Customer Customer { get; set; } = default!;

        public Guid GatewayId { get; set; }

        public Gateway Gateway { get; set; } = default!;

        public DeviceStatus Status { get; set; }

        public bool IsOnline { get; set; }

        public DateTime? LastSeenUtc { get; set; }
    }
}

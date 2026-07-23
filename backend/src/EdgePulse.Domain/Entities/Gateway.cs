using System;
using System.Collections.Generic;
using System.Text;

namespace EdgePulse.Domain.Entities
{
    public class Gateway : BaseEntity
    {
        public string Name { get; set; } = string.Empty;

        public string IpAddress { get; set; } = string.Empty;

        public string SerialNumber { get; set; } = string.Empty;

        public Guid CustomerId { get; set; }

        public Customer Customer { get; set; } = default!;

        public ICollection<Device> Devices { get; set; } = new List<Device>();
    }
}

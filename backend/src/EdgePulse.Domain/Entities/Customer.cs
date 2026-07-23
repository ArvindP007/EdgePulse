using System;
using System.Collections.Generic;
using System.Text;

namespace EdgePulse.Domain.Entities
{
    public class Customer : BaseEntity
    {
        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public ICollection<User> Users { get; set; } = new List<User>();

        public ICollection<Device> Devices { get; set; } = new List<Device>();

        public ICollection<Gateway> Gateways { get; set; } = new List<Gateway>();
    }
}

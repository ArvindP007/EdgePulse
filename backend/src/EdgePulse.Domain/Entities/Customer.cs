using System;
using System.Collections.Generic;
using System.Text;

namespace EdgePulse.Domain.Entities
{
    public class Customer : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string? Code { get; set; }

        public string Email { get; set; } = string.Empty;

        public string? ContactPerson { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

        public ICollection<Device> Devices { get; set; } = new List<Device>();

        public ICollection<Gateway> Gateways { get; set; } = new List<Gateway>();
        public ICollection<UserCustomer> UserCustomers { get; set; } = new List<UserCustomer>();
    }
}

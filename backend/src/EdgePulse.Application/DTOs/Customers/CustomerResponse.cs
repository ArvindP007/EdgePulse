using System;
using System.Collections.Generic;
using System.Text;

namespace EdgePulse.Application.DTOs.Customers
{
    public class CustomerResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string? ContactPerson { get; set; }

        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }

        public DateTime CreatedOnUtc { get; set; }
    }
}

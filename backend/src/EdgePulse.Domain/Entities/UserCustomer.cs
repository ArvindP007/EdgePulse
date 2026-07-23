using System;
using System.Collections.Generic;
using System.Text;

namespace EdgePulse.Domain.Entities
{
    public class UserCustomer
    {
        public Guid UserId { get; set; }

        public User User { get; set; } = default!;

        public Guid CustomerId { get; set; }

        public Customer Customer { get; set; } = default!;
    }
}

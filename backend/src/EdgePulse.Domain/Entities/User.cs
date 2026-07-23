using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace EdgePulse.Domain.Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;

        public Guid CustomerId { get; set; }

        public Customer Customer { get; set; } = default!;

        public Guid RoleId { get; set; }

        public Role Role { get; set; } = default!;
    }
}

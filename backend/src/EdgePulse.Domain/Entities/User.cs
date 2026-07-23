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

        public Guid RoleId { get; set; }

        public Role Role { get; set; } = default!;
        public ICollection<UserCustomer> UserCustomers { get; set; } = new List<UserCustomer>();
    }
}

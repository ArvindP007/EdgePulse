using System;
using System.Collections.Generic;
using System.Text;

namespace EdgePulse.Domain.Entities
{
    public abstract class BaseEntity
    {
        public Guid Id { get; set; }

        public DateTime CreatedOnUtc { get; set; }

        public DateTime? UpdatedOnUtc { get; set; }

        public bool IsDeleted { get; set; }

        public Guid CreatedBy { get; set; }

        public Guid? UpdatedBy { get; set; }
    }
}

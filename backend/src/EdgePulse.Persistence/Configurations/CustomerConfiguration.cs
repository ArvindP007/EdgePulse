using EdgePulse.Domain.Entities;
using EdgePulse.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EdgePulse.Persistence.Configurations;

public class CustomerConfiguration : BaseEntityConfiguration<Customer>
{
    public override void Configure(EntityTypeBuilder<Customer> builder)
    {
        base.Configure(builder);

        builder.Property(x => x.Name)
              .HasMaxLength(200)
              .IsRequired();

        builder.Property(x => x.Code)
               .HasMaxLength(50);

        builder.Property(x => x.Email)
               .HasMaxLength(200);

        builder.Property(x => x.ContactPerson)
               .HasMaxLength(150);

        builder.Property(x => x.PhoneNumber)
               .HasMaxLength(20);

        builder.Property(x => x.Address)
               .HasMaxLength(500);

        builder.HasIndex(x => x.Name);

        builder.HasIndex(x => x.Email);
    }
}
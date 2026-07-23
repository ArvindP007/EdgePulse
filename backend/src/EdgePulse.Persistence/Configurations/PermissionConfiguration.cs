using EdgePulse.Domain.Entities;
using EdgePulse.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EdgePulse.Persistence.Configurations;

public class PermissionConfiguration : BaseEntityConfiguration<Permission>
{
    public override void Configure(EntityTypeBuilder<Permission> builder)
    {
        base.Configure(builder);

        builder.Property(x => x.Name)
               .HasMaxLength(150)
               .IsRequired();

        builder.Property(x => x.Code)
               .HasMaxLength(150)
               .IsRequired();

        builder.Property(x => x.Description)
               .HasMaxLength(500);

        builder.HasIndex(x => x.Code)
               .IsUnique();
    }
}
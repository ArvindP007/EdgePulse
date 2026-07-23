using EdgePulse.Domain.Entities;
using EdgePulse.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EdgePulse.Persistence.Configurations;

public class GatewayConfiguration : BaseEntityConfiguration<Gateway>
{
    public override void Configure(EntityTypeBuilder<Gateway> builder)
    {
        base.Configure(builder);

        builder.HasOne(x => x.Customer)
               .WithMany(x => x.Gateways)
               .HasForeignKey(x => x.CustomerId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.Property(x => x.Name)
               .HasMaxLength(200)
               .IsRequired();

        builder.Property(x => x.SerialNumber)
               .HasMaxLength(100);

        builder.HasIndex(x => x.SerialNumber)
               .IsUnique();

        builder.HasOne(x => x.Customer)
               .WithMany(x => x.Gateways)
               .HasForeignKey(x => x.CustomerId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.HasMany(x => x.Devices)
               .WithOne(x => x.Gateway)
               .HasForeignKey(x => x.GatewayId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}
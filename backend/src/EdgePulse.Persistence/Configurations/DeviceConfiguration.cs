using EdgePulse.Domain.Entities;
using EdgePulse.Persistence.Configurations.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EdgePulse.Persistence.Configurations;

public class DeviceConfiguration : BaseEntityConfiguration<Device>
{
    public override void Configure(EntityTypeBuilder<Device> builder)
    {
        base.Configure(builder);

        builder.HasOne(x => x.Customer)
               .WithMany(x => x.Devices)
               .HasForeignKey(x => x.CustomerId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.Property(x => x.Name)
               .HasMaxLength(200)
               .IsRequired();

        builder.Property(x => x.SerialNumber)
               .HasMaxLength(100);

        builder.HasIndex(x => x.SerialNumber)
               .IsUnique();

        builder.Property(x => x.Status)
               .HasConversion<int>();

        builder.Property(x => x.IsOnline)
                .HasDefaultValue(false);

        builder.Property(x => x.LastSeenUtc)
               .IsRequired(false);

        builder.HasOne(x => x.Customer)
              .WithMany(x => x.Devices)
              .HasForeignKey(x => x.CustomerId)
              .OnDelete(DeleteBehavior.Restrict);

        builder.HasOne(x => x.Gateway)
               .WithMany(x => x.Devices)
               .HasForeignKey(x => x.GatewayId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}
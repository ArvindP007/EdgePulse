using EdgePulse.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EdgePulse.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.Property(x => x.FirstName)
               .HasMaxLength(100)
               .IsRequired();

        builder.Property(x => x.LastName)
               .HasMaxLength(100)
               .IsRequired();

        builder.Property(x => x.Email)
               .HasMaxLength(200)
               .IsRequired();

        builder.Property(x => x.PasswordHash)
               .IsRequired();

        builder.HasIndex(x => x.Email)
               .IsUnique();

        builder.HasOne(x => x.Role)
               .WithMany(x => x.Users)
               .HasForeignKey(x => x.RoleId)
               .OnDelete(DeleteBehavior.Restrict);
    }
}
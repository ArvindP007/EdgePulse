using EdgePulse.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EdgePulse.Persistence.Configurations;

public class UserCustomerConfiguration : IEntityTypeConfiguration<UserCustomer>
{
    public void Configure(EntityTypeBuilder<UserCustomer> builder)
    {
        builder.HasKey(x => new
        {
            x.UserId,
            x.CustomerId
        });

        builder.HasOne(x => x.User)
               .WithMany(x => x.UserCustomers)
               .HasForeignKey(x => x.UserId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Customer)
               .WithMany(x => x.UserCustomers)
               .HasForeignKey(x => x.CustomerId)
               .OnDelete(DeleteBehavior.Cascade);
    }
}
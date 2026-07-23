using Microsoft.EntityFrameworkCore;
using EdgePulse.Application.Common.Authorization;
using EdgePulse.Application.Interfaces;
using EdgePulse.Domain.Entities;
using EdgePulse.Persistence.Context;

namespace EdgePulse.Infrastructure.Seed
{
    public class DatabaseSeeder
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher _passwordHasher;
        public DatabaseSeeder(ApplicationDbContext context, IPasswordHasher passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }
        public async Task SeedAsync()
        {
            await using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                await SeedRolesAsync();
                await SeedPermissionsAsync();
                await SeedRolePermissionsAsync();
                await SeedCustomerAsync();
                await SeedSuperAdminAsync();

                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        private async Task SeedRolesAsync()
        {
            if (await _context.Roles.AnyAsync())
                return;

            var roles = new List<Role>
        {
            new()
            {
                Id = Guid.NewGuid(),
                Name = "SuperAdmin",
                Description = "System Administrator"
            },
            new()
            {
                Id = Guid.NewGuid(),
                Name = "CustomerAdmin",
                Description = "Customer Administrator"
            }
        };

            await _context.Roles.AddRangeAsync(roles);

            await _context.SaveChangesAsync();
        }

        private async Task SeedPermissionsAsync()
        {
            if (await _context.Permissions.AnyAsync())
                return;

            var permissions = PermissionProvider.GetAll()
                .Select(permission => new Permission
                {
                    Id = Guid.NewGuid(),
                    Name = permission,
                    Code = permission,
                    Description = permission
                });

            await _context.Permissions.AddRangeAsync(permissions);
            await _context.SaveChangesAsync();
        }

        private async Task SeedRolePermissionsAsync()
        {
            if (await _context.RolePermissions.AnyAsync())
                return;

            var superAdminRole = await _context.Roles
                .FirstAsync(r => r.Name == "SuperAdmin");

            var permissions = await _context.Permissions.ToListAsync();

            var mappings = permissions.Select(permission => new RolePermission
            {
                RoleId = superAdminRole.Id,
                PermissionId = permission.Id
            });

            await _context.RolePermissions.AddRangeAsync(mappings);
            await _context.SaveChangesAsync();
        }

        private async Task SeedCustomerAsync()
        {
            if (await _context.Customers.AnyAsync())
                return;

            var customer = new Customer
            {
                Id = Guid.NewGuid(),
                Name = "EdgePulse Demo Customer",
                Email = "contact@edgepulse.com"
            };

            await _context.Customers.AddAsync(customer);
            await _context.SaveChangesAsync();
        }
        private async Task SeedSuperAdminAsync()
        {
            if (await _context.Users.AnyAsync(u => u.Email == "admin@edgepulse.com"))
                return;

            var role = await _context.Roles.FirstAsync(r => r.Name == "SuperAdmin");
            var customer = await _context.Customers.FirstAsync();

            var user = new User
            {
                Id = Guid.NewGuid(),
                CustomerId = customer.Id,
                RoleId = role.Id,
                FirstName = "System",
                LastName = "Administrator",
                Email = "admin@edgepulse.com",
                PasswordHash = _passwordHasher.Hash("Admin@123"),
                IsDeleted = false
            };

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
    }
}

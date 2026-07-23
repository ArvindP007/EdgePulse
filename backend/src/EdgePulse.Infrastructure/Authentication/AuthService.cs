using EdgePulse.Application.Common.Models;
using EdgePulse.Application.DTOs.Auth;
using EdgePulse.Application.Interfaces;
using EdgePulse.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace EdgePulse.Infrastructure.Authentication
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthService(ApplicationDbContext context, IPasswordHasher passwordHasher, IJwtTokenService jwtTokenService)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _jwtTokenService = jwtTokenService;
        }
        public async Task<LoginResponse> LoginAsync(LoginRequest request)
        {
            var user = await _context.Users.AsNoTracking()
                        .Include(x => x.Role)
                            .ThenInclude(x => x.RolePermissions)
                                .ThenInclude(x => x.Permission)
                        .FirstOrDefaultAsync(x => x.Email == request.Email.ToLower() && !x.IsDeleted);

            if (user == null || !_passwordHasher.Verify(request.Password, user.PasswordHash))
            {
                throw new UnauthorizedAccessException("Invalid email or password.");
            }

            var permissions = user.Role.RolePermissions.Select(x => x.Permission.Name).ToList();

            var authUser = new AuthUser
            {
                UserId = user.Id,
                CustomerId = user.CustomerId,
                RoleId = user.RoleId,
                Email = user.Email,
                FullName = $"{user.FirstName} {user.LastName}",
                RoleName = user.Role.Name
            };

            var token = _jwtTokenService.GenerateToken(authUser,permissions);

            return new LoginResponse
            {
                AccessToken = token.AccessToken,
                ExpiresAt = token.ExpiresAt,
                TokenType = "Bearer",
                User = new UserInfo
                {
                    UserId = user.Id,
                    CustomerId = user.CustomerId,
                    FullName = $"{user.FirstName} {user.LastName}",
                    Email = user.Email,
                    Role = user.Role.Name
                }
            };
        }
    }
}

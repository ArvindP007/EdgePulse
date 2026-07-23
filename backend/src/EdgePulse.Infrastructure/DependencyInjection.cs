using EdgePulse.Application.Interfaces;
using EdgePulse.Infrastructure.Authentication;
using EdgePulse.Infrastructure.Seed;
using Microsoft.Extensions.DependencyInjection;

namespace EdgePulse.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services)
    {
        services.AddScoped<IPasswordHasher, BCryptPasswordHasher>();
        services.AddScoped<IJwtTokenService, JwtTokenService>();
        services.AddScoped<IAuthService, AuthService>();
        services.AddScoped<DatabaseSeeder>();

        return services;
    }
}
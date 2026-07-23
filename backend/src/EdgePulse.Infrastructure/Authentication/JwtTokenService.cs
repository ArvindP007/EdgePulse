using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EdgePulse.Application.Common.Models;
using EdgePulse.Application.Common.Settings;
using EdgePulse.Application.Interfaces;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace EdgePulse.Infrastructure.Authentication;

public class JwtTokenService : IJwtTokenService
{
    private readonly JwtSettings _jwtSettings;

    public JwtTokenService(IOptions<JwtSettings> options)
    {
        _jwtSettings = options.Value;
    }

    public JwtTokenResult GenerateToken(
        AuthUser user,
        IEnumerable<string> permissions)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(ClaimTypes.Role, user.RoleName),

            new("roleId", user.RoleId.ToString())
        };

        claims.AddRange(
            permissions.Select(permission =>
                new Claim("permission", permission)));

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256);

        var expires =
            DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiryMinutes);

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: expires,
            signingCredentials: credentials);

        return new JwtTokenResult
        {
            AccessToken = new JwtSecurityTokenHandler()
        .WriteToken(token),

            ExpiresAt = expires
        };
    }
}
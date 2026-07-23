namespace EdgePulse.Application.Common.Models;

public class JwtTokenResult
{
    public string AccessToken { get; init; } = string.Empty;

    public DateTime ExpiresAt { get; init; }
}
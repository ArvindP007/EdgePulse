using System;
using System.Collections.Generic;
using System.Text;

namespace EdgePulse.Application.DTOs.Auth
{
    public class LoginResponse
    {
        public string AccessToken { get; set; } = string.Empty;

        public DateTime ExpiresAt { get; set; }
        public string TokenType { get; set; } = "Bearer";

        public UserInfo User { get; set; } = default!;
    }
}

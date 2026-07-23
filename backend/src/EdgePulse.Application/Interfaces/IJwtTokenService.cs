using EdgePulse.Application.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace EdgePulse.Application.Interfaces
{
    public interface IJwtTokenService
    {
        JwtTokenResult GenerateToken(AuthUser user, IEnumerable<string> permissions);
    }
}

using EdgePulse.Application.DTOs.Auth;
using System;
using System.Collections.Generic;
using System.Text;

namespace EdgePulse.Application.Interfaces
{
    public interface IAuthService
    {
        Task<LoginResponse> LoginAsync(LoginRequest request);
    }
}

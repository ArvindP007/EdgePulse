using EdgePulse.Application.Common.Models;
using EdgePulse.Application.DTOs.Customers;
using EdgePulse.Application.Features.Customers.DTOs;

namespace EdgePulse.Application.Features.Customers.Interfaces;

public interface ICustomerService
{
    Task<PagedResult<CustomerDto>> GetAllAsync(PagedRequest request);

    Task<CustomerDto?> GetByIdAsync(Guid id);

    Task<CustomerDto> CreateAsync(CreateCustomerRequest request);

    Task UpdateAsync(Guid id, UpdateCustomerRequest request);

    Task DeleteAsync(Guid id);
}
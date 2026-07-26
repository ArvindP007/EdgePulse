using EdgePulse.Application.Common.Models;
using EdgePulse.Application.DTOs.Customers;
using EdgePulse.Application.Features.Customers.DTOs;
using EdgePulse.Application.Features.Customers.Interfaces;
using EdgePulse.Domain.Entities;
using EdgePulse.Persistence.Context;
using Microsoft.EntityFrameworkCore;

namespace EdgePulse.Infrastructure.Services;

public class CustomerService : ICustomerService
{
    private readonly ApplicationDbContext _context;

    public CustomerService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CustomerDto> CreateAsync(CreateCustomerRequest request)
    {
        var customer = new Customer
        {
            Id = Guid.NewGuid(),
            Name = request.Name.Trim(),
            Code = request.Code.Trim().ToUpperInvariant(),
            Email = request.Email?.Trim() ?? string.Empty,
            ContactPerson = request.ContactPerson?.Trim(),
            PhoneNumber = request.PhoneNumber?.Trim(),
            Address = request.Address?.Trim()
        };

        _context.Customers.Add(customer);
        await _context.SaveChangesAsync();

        return MapToDto(customer);
    }

    public async Task DeleteAsync(Guid id)
    {
        var customer = await _context.Customers
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);

        if (customer == null)
            throw new KeyNotFoundException("Customer not found.");

        customer.IsDeleted = true;

        await _context.SaveChangesAsync();
    }

    public async Task<PagedResult<CustomerDto>> GetAllAsync(PagedRequest request)
    {
        var query = _context.Customers
        .AsNoTracking()
        .Where(c => !c.IsDeleted);

        if (!string.IsNullOrWhiteSpace(request.Search))
        {
            var search = request.Search.Trim();

            query = query.Where(c =>
                c.Name.Contains(search) ||
                c.Code.Contains(search) ||
                c.Email.Contains(search));
        }

        var totalCount = await query.CountAsync();

        var items = await query
            .OrderBy(c => c.Name)
            .Skip((request.PageNumber - 1) * request.PageSize)
            .Take(request.PageSize)
            .Select(c => MapToDto(c))
            .ToListAsync();

        return new PagedResult<CustomerDto>
        {
            Items = items,
            PageNumber = request.PageNumber,
            PageSize = request.PageSize,
            TotalCount = totalCount
        };
    }

    public async Task<CustomerDto?> GetByIdAsync(Guid id)
    {
        return await _context.Customers
            .AsNoTracking()
            .Where(c => c.Id == id && !c.IsDeleted)
            .Select(c => MapToDto(c))
            .FirstOrDefaultAsync();
    }

    public async Task UpdateAsync(Guid id, UpdateCustomerRequest request)
    {
        var customer = await _context.Customers
            .FirstOrDefaultAsync(c => c.Id == id && !c.IsDeleted);

        if (customer == null)
            throw new KeyNotFoundException("Customer not found.");

        customer.Name = request.Name.Trim();
        customer.Code = request.Code.Trim().ToUpperInvariant();
        customer.Email = request.Email?.Trim() ?? string.Empty;
        customer.ContactPerson = request.ContactPerson?.Trim();
        customer.PhoneNumber = request.PhoneNumber?.Trim();
        customer.Address = request.Address?.Trim();

        await _context.SaveChangesAsync();
    }

    private static CustomerDto MapToDto(Customer customer)
    {
        return new CustomerDto
        {
            Id = customer.Id,
            Name = customer.Name,
            Code = customer.Code,
            Email = customer.Email,
            ContactPerson = customer.ContactPerson,
            PhoneNumber = customer.PhoneNumber,
            Address = customer.Address
        };
    }
}
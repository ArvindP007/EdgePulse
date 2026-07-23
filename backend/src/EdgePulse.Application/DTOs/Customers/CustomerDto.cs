namespace EdgePulse.Application.Features.Customers.DTOs;

public class CustomerDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Code { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string ContactPerson { get; set; } = string.Empty;

    public string PhoneNumber { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;
}
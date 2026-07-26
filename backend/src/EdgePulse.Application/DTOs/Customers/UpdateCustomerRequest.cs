using System.ComponentModel.DataAnnotations;

namespace EdgePulse.Application.DTOs.Customers
{
    public class UpdateCustomerRequest
    {
        [Required]
        [MinLength(2)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MinLength(2)]
        public string Code { get; set; } = string.Empty;

        public string? ContactPerson { get; set; }

        [EmailAddress]
        public string? Email { get; set; }

        public string? PhoneNumber { get; set; }

        public string? Address { get; set; }
    }
}

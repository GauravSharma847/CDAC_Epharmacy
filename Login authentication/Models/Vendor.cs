using System.ComponentModel.DataAnnotations;

namespace Login_authentication.Models
{
    public class Vendor
    {
        [Key]
        public int VendorID { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required, EmailAddress]
        public string? Email { get; set; }

        [Required]
        public string? PasswordHash { get; set; } // Store hashed password

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}

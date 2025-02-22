using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public enum UserType
{
    Admin,
    Vendor,
    Customer
}

public class User
{
    public int UserId { get; set; }

    [Required]
    [EmailAddress]
    public string? Email { get; set; }

    [Required]
    public string? Name { get; set; }

    [Required]
    [MinLength(8)]
    [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
        ErrorMessage = "Password must be at least 8 characters long, contain at least one letter, one number, and one special character.")]
    public string? Password { get; set; }

    [Required]
    public UserType UserType { get; set; } // ✅ Stored as Enum

    public string? Location { get; set; }
}

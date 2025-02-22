using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Login_authentication.Models
{
    public class Sale
    {
        [Key]
        public int SaleId { get; set; }

        [Required]
        public int CustomerId { get; set; }  // Foreign Key (Customer)

        [Required]
        public int ProductId { get; set; }  // Foreign Key (MainProduct)

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal TotalAmount { get; set; }  // Price * Quantity

        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;

        [Required]
        public int VendorId { get; set; }  // Ensure it's spelled correctly


        [ForeignKey("CustomerId")]
        public User Customer { get; set; }

        [ForeignKey("ProductId")]
        public MainProduct Product { get; set; }
    }
}

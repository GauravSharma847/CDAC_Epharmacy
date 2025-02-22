using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Login_authentication.Models
{
    public class CartItem
    {
        [Key]
        public int CartItemId { get; set; }

        [Required]
        public int CustomerId { get; set; }  // Foreign Key (Customer)

        [Required]
        public int ProductId { get; set; }  // Foreign Key (MainProduct)

        [Required]
        public int Quantity { get; set; }

        public DateTime AddedDate { get; set; } = DateTime.UtcNow;

        [ForeignKey("CustomerId")]
        public User Customer { get; set; }

        [ForeignKey("ProductId")]
        public MainProduct Product { get; set; }
    }
}

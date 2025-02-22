
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Login_authentication.Models
{
    public class Order
    {
        [Key]
        [Column("OrderId")]
        public int Id { get; set; }

        [Required]
        public int CustomerId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal TotalPrice { get; set; }

        [Required]
        public DateTime OrderDate { get; set; }

        [ForeignKey("CustomerId")]
        public User Customer { get; set; }

        [ForeignKey("ProductId")]
        public MainProduct Product { get; set; }
    }
}

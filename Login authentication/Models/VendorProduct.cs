using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Login_authentication.Models
{
    public class VendorProduct
    {
        [Key]
        [Column("vendor_product_id")]
        public int VendorProductId { get; set; }

        [Required]
        [Column("vendor_id")]
        public int VendorId { get; set; }

        [Required]
        [Column("product_name")]
        public string ProductName { get; set; }

        [Required]
        [Column("price")]
        public decimal Price { get; set; }

        [Required]
        [Column("quantity")]
        public int Quantity { get; set; }

        [Required]
        [Column("manufacture_date")]
        public DateTime ManufactureDate { get; set; }

        [Required]
        [Column("expiry_date")]
        public DateTime ExpiryDate { get; set; }

        [Column("image")]
        public byte[]? Image { get; set; }  // New Image Field

        [ForeignKey("VendorId")]
        public User Vendor { get; set; }  // Vendor-User relationship based on VendorId
    }
}

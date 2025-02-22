using Login_authentication.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class MainProduct
{
    [Key]
    [Column("product_id")]
    public int ProductId { get; set; }

    [Required]
    [Column("vendor_product_id")]
    public int VendorProductId { get; set; }

    [Required]
    [Column("product_name")]
    [MaxLength(255)]
    public string ProductName { get; set; }

    [Required]
    [Column("price")]
    [Precision(10, 2)]
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

    // Make sure ForeignKey attribute is correctly set
    [ForeignKey("VendorProductId")]
    public VendorProduct VendorProduct { get; set; }
}

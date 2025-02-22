using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Transaction
{
    [Key]
    public int Id { get; set; }

    [Required]
    [Column("user_id")]
    public int UserId { get; set; }  // user_id in DB

    [Required]
    public decimal Amount { get; set; }

    [Required]
    public string PaymentId { get; set; }  // payment_id in DB

    [Required]
    [Column("order_id")]
    public string OrderId { get; set; }  // order_id in DB

    [Required]
    public string Status { get; set; }  // Success or Failed

    [Required]
    [Column("created_at")]
    public DateTime CreatedAt { get; set; }  // created_at in DB
}

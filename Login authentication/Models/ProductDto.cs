public class ProductDto
{
    public int VendorId { get; set; }
    public string ProductName { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
    public DateTime ManufactureDate { get; set; }
    public DateTime ExpiryDate { get; set; }
    public string Category { get; set; }
    public string Description { get; set; }
    public bool BestSeller { get; set; }
    public IFormFile Image { get; set; }
}

using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;
using Login_authentication.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;

[Route("api/vendor")]
[ApiController]
[EnableCors("AllowFrontend")]
public class VendorController : ControllerBase
{
    private readonly AppDbContext _context;

    public VendorController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("products")]
    public IActionResult GetVendorProducts(int vendorId)
    {
        // Removed session check, using vendorId directly in the request
        var products = _context.VendorProducts.Where(p => p.VendorId == vendorId).ToList();
        return Ok(products);
    }

    [HttpPost("add-product")]
    public async Task<IActionResult> AddProduct([FromForm] ProductDto model)
    {
        // Removed session check, using model.VendorId directly
        if (model.VendorId <= 0)
        {
            return BadRequest(new { error = "Invalid vendor ID." });
        }

        try
        {
            // Validate the product data
            if (string.IsNullOrEmpty(model.ProductName) || model.Price <= 0 || model.Quantity <= 0)
            {
                return BadRequest(new { error = "Product details are invalid. Please provide valid product name, price, and quantity." });
            }

            var product = new VendorProduct
            {
                VendorId = model.VendorId,
                ProductName = model.ProductName,
                Price = model.Price,
                Quantity = model.Quantity,
                ManufactureDate = model.ManufactureDate,
                ExpiryDate = model.ExpiryDate,
                Image = model.Image != null ? await ConvertToBytes(model.Image) : null
            };

            _context.VendorProducts.Add(product);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Product added successfully!", productId = product.VendorProductId });
        }
        catch (Exception ex)
        {
            // Log the exception for debugging purposes
            return BadRequest(new { error = "An error occurred while adding the product. Please try again later." });
        }
    }

    private async Task<byte[]> ConvertToBytes(IFormFile image)
    {
        using (var memoryStream = new MemoryStream())
        {
            await image.CopyToAsync(memoryStream);
            return memoryStream.ToArray();
        }
    }


    [HttpDelete("remove-product/{id}")]
    public IActionResult RemoveProduct(int id, int vendorId)
    {
        // Removed session check, using vendorId from the request
        var product = _context.VendorProducts.FirstOrDefault(p => p.VendorProductId == id && p.VendorId == vendorId);
        if (product == null)
        {
            return NotFound("Product not found.");
        }

        _context.VendorProducts.Remove(product);
        _context.SaveChanges();
        return Ok("Product removed successfully.");
    }
}

using Login_authentication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // Ensure you include this for `.Include()`
using System.Linq;

namespace Login_authentication.Controllers
{
    public class ProductController : Controller
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetVendorProducts()
        {
            int? vendorId = HttpContext.Session.GetInt32("VendorID");
            if (vendorId == null)
                return Unauthorized();

            var products = _context.MainProducts
                .Include(p => p.VendorProduct) // Ensures VendorProduct data is fetched
                .Where(p => p.VendorProduct.VendorId == vendorId)
                .ToList();

            if (products == null || !products.Any())
                return NotFound(new { message = "No products found for this vendor." });

            return Ok(products);
        }

        [HttpPost]
        public IActionResult AddProduct([FromBody] MainProduct product)
        {
            int? vendorId = HttpContext.Session.GetInt32("VendorID");
            if (vendorId == null)
                return Unauthorized();

            var vendorProduct = _context.VendorProducts.FirstOrDefault(vp => vp.VendorId == vendorId);

            if (vendorProduct == null)
            {
                return BadRequest("Vendor not found or no existing VendorProduct.");
            }

            product.VendorProductId = vendorProduct.VendorProductId;

            _context.MainProducts.Add(product);
            _context.SaveChanges();

            return Ok(new { message = "Product added successfully" });
        }
    }
}

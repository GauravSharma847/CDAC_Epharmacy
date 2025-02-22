using Login_authentication.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

namespace Login_authentication.Controllers
{
    [Route("api/customer")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CustomerController(AppDbContext context)
        {
            _context = context;
        }

        // ✅ Search Products (Get products by name)
        [HttpGet("search-products")]
        public async Task<IActionResult> SearchProducts([FromQuery] string productName)
        {
            // Check if productName is null or empty
            if (string.IsNullOrEmpty(productName))
            {
                return BadRequest("Product name is required.");
            }

            // SQL query to search for products that match the name
            var products = await _context.MainProducts
                .FromSqlRaw("SELECT * FROM mainproducts WHERE product_name LIKE {0}", $"%{productName}%")
                .ToListAsync();

            return Ok(products);
        }


        // ✅ Add Product to Cart
        [HttpPost("add-to-cart")]
        public async Task<IActionResult> AddToCart([FromBody] CartItem cartItem)
        {
            var customerId = HttpContext.Session.GetInt32("UserId");
            if (customerId == null)
                return Unauthorized("Customer not logged in");

            var product = await _context.MainProducts
                .FirstOrDefaultAsync(p => p.ProductId == cartItem.ProductId);

            if (product == null)
                return NotFound("Product not found");

            if (product.Quantity < cartItem.Quantity)
                return BadRequest("Insufficient stock for this product");

            cartItem.CustomerId = customerId.Value;
            _context.CartItems.Add(cartItem);
            await _context.SaveChangesAsync();

            return Ok("Product added to cart");
        }

        // ✅ View Cart
        [HttpGet("view-cart")]
        public async Task<IActionResult> ViewCart()
        {
            var customerId = HttpContext.Session.GetInt32("UserId");
            if (customerId == null)
                return Unauthorized("Customer not logged in");

            var cartItems = await _context.CartItems
                .Where(ci => ci.CustomerId == customerId)
                .Include(ci => ci.Product)
                .ToListAsync();

            return Ok(cartItems);
        }

        // ✅ Remove Product from Cart
        [HttpDelete("remove-from-cart/{cartItemId}")]
        public async Task<IActionResult> RemoveFromCart(int cartItemId)
        {
            var customerId = HttpContext.Session.GetInt32("UserId");
            if (customerId == null)
                return Unauthorized("Customer not logged in");

            var cartItem = await _context.CartItems
                .FirstOrDefaultAsync(ci => ci.CartItemId == cartItemId && ci.CustomerId == customerId);
            if (cartItem == null)
                return NotFound("Item not found in cart");

            _context.CartItems.Remove(cartItem);
            await _context.SaveChangesAsync();

            return Ok("Product removed from cart");
        }

        // ✅ Purchase Products
        [HttpPost("purchase")]
        public async Task<IActionResult> Purchase()
        {
            var customerId = HttpContext.Session.GetInt32("UserId");
            if (customerId == null)
                return Unauthorized("Customer not logged in");

            var cartItems = await _context.CartItems.Where(ci => ci.CustomerId == customerId).ToListAsync();
            if (!cartItems.Any())
                return BadRequest("Cart is empty");

            foreach (var cartItem in cartItems)
            {
                var product = await _context.MainProducts.FindAsync(cartItem.ProductId);
                if (product == null || product.Quantity < cartItem.Quantity)
                    return BadRequest("Insufficient stock for some items");

                product.Quantity -= cartItem.Quantity;
            }

            _context.CartItems.RemoveRange(cartItems);
            await _context.SaveChangesAsync();

            return Ok("Purchase successful");
        }
    }
}

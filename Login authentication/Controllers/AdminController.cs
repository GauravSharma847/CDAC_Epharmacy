using Login_authentication.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/admin")]
[ApiController]
[EnableCors("AllowFrontend")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _context;

    public AdminController(AppDbContext context)
    {
        _context = context;
    }

    // Get all admins
    [HttpGet("get-admins")]
    public async Task<IActionResult> GetAdmins()
    {
        var admins = await _context.Users
            .Where(u => u.UserType == UserType.Admin) // ✅ Compare using Enum
            .ToListAsync();
        return Ok(admins);
    }

    // Add a new admin
    [HttpPost("add-admin")]
    public async Task<IActionResult> AddAdmin([FromBody] User user)
    {
        try
        {
            if (user == null)
            {
                return BadRequest("Invalid request data.");
            }

            // Ensure the UserType is Admin
            user.UserType = UserType.Admin; // ✅ Set UserType to Admin explicitly

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Admin added successfully!" });
        }
        catch (Exception ex)
        {
            return BadRequest($"Error: {ex.Message}");
        }
    }

    // Delete an admin
    [HttpDelete("delete-admin/{id}")]
    public async Task<IActionResult> DeleteAdmin(int id)
    {
        var admin = await _context.Users.FindAsync(id);
        if (admin != null && admin.UserType == UserType.Admin) // ✅ Compare using Enum
        {
            _context.Users.Remove(admin);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Admin deleted successfully" });
        }

        return NotFound(new { message = "Admin not found" });
    }

    //For Customers 

    // ✅ Get all customers (Paginated)
    [HttpGet("customers")]
    public async Task<IActionResult> GetCustomers([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        var customers = await _context.Users
            .Where(u => u.UserType == UserType.Customer) // Filter customers
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(u => new
            {
                u.UserId,
                u.Name,
                u.Email
            })
            .ToListAsync();

        return Ok(new { customers, total = _context.Users.Count(u => u.UserType == UserType.Customer) });
    }

    // ✅ Remove a customer
    [HttpDelete("remove-customer/{id}")]
    public async Task<IActionResult> RemoveCustomer(int id)
    {
        var customer = await _context.Users.FindAsync(id);
        if (customer == null || customer.UserType != UserType.Customer)
        {
            return NotFound(new { message = "Customer not found" });
        }

        _context.Users.Remove(customer);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Customer removed successfully" });
    }

    //For Vendor

    // ✅ Get all vendors
    [HttpGet("vendors")]
    public async Task<IActionResult> GetVendors(int page = 1, int pageSize = 10)
    {
        var vendors = await _context.Users
            .Where(u => u.UserType == UserType.Vendor)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(v => new { v.UserId, v.Name, v.Email }) // Select only necessary fields
            .ToListAsync();

        return Ok(new { vendors });
    }

    // ✅ Remove a vendor
    [HttpDelete("remove-vendor/{id}")]
    public async Task<IActionResult> RemoveVendor(int id)
    {
        var vendor = await _context.Users.FindAsync(id);
        if (vendor != null && vendor.UserType == UserType.Vendor)
        {
            _context.Users.Remove(vendor);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Vendor removed successfully" });
        }

        return NotFound(new { message = "Vendor not found" });
    }

    //For Transactions

    [HttpGet("transactions")]
    public async Task<IActionResult> GetTransactions()
    {
        var transactions = await _context.Transactions
            .Select(t => new
            {
                t.Id,              // Transaction ID
                t.UserId,          // User ID (mapped correctly to `user_id`)
                t.Amount,          // Transaction Amount
                t.OrderId,         // Order ID
                t.Status,          // Transaction Status
                t.CreatedAt        // Transaction Date (Created At)
            })
            .ToListAsync();

        if (transactions == null || transactions.Count == 0)
        {
            return NotFound(new { message = "No transactions found." });
        }

        return Ok(new { transactions });
    }




}
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Login_authentication.Models;
using Login_authentication.DTOS;

namespace Login_authentication.Controllers
{
    [Route("api/auth")]
    [ApiController]

    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        // 1. Register a new user
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User registerDetails)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { message = "Invalid input data" });

            // Check if email is already registered
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == registerDetails.Email);

            if (existingUser != null)
            {
                return BadRequest(new { message = "Email already exists" });
            }

            // Hash the password before saving
            registerDetails.Password = BCrypt.Net.BCrypt.HashPassword(registerDetails.Password);
            _context.Users.Add(registerDetails);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Registration successful" });
        }

        // 2. Login user
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginDetails)
        {
            if (string.IsNullOrWhiteSpace(loginDetails.Email) || string.IsNullOrWhiteSpace(loginDetails.Password))
            {
                return BadRequest(new { message = "Email and password are required" });
            }

            // Normalize email for case-insensitive lookup
            var user = _context.Users.FirstOrDefault(u => u.Email.ToLower() == loginDetails.Email.ToLower());

            if (user == null || !BCrypt.Net.BCrypt.Verify(loginDetails.Password, user.Password))
            {
                return Unauthorized(new { message = "Invalid credentials" });
            }

            // Set session variables
            HttpContext.Session.SetString("Username", user.Name);
            HttpContext.Session.SetString("Role", user.UserType.ToString());
            HttpContext.Session.SetString("userid", user.UserId.ToString());

            return Ok(new { message = "Login successful", role = user.UserType, userid = user.UserId });
        }

        // 3. Logout user
        [HttpGet("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return Ok(new { message = "Logout successful" });
        }

        // 4. Get user profile
        [HttpGet("profile")]
        public IActionResult GetProfile()
        {
            var username = HttpContext.Session.GetString("Username");
            var role = HttpContext.Session.GetString("Role");

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(role))
            {
                return Unauthorized(new { message = "You must be logged in" });
            }

            var user = _context.Users.FirstOrDefault(u => u.Name == username);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(new
            {
                Username = user.Name,
                Role = role,
                Location = user.Location
            });
        }

        // 5. Role-based access control for admin
        [HttpGet("admin-dashboard")]
        public IActionResult AdminDashboard()
        {
            var role = HttpContext.Session.GetString("Role");
            if (role != "Admin")
            {
                return Unauthorized(new { message = "Access denied. Admins only." });
            }

            return Ok(new { message = "Welcome to the Admin Dashboard" });
        }

        // 6. Vendor dashboard
        [HttpGet("vendor-dashboard")]
        public IActionResult VendorDashboard()
        {
            var role = HttpContext.Session.GetString("Role");
            if (role != "Vendor")
            {
                return Unauthorized(new { message = "Access denied. Vendors only." });
            }

            return Ok(new { message = "Welcome to the Vendor Dashboard" });
        }

        // 7. Customer dashboard
        [HttpGet("customer-dashboard")]
        public IActionResult CustomerDashboard()
        {
            var role = HttpContext.Session.GetString("Role");
            if (role != "Customer")
            {
                return Unauthorized(new { message = "Access denied. Customers only." });
            }

            return Ok(new { message = "Welcome to the Customer Dashboard" });
        }
    }
}

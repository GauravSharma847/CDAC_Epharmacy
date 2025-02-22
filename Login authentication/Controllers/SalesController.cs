using Login_authentication.Models;
using Microsoft.AspNetCore.Mvc;

namespace Login_authentication.Controllers
{
    public class SalesController : Controller
    {
        private readonly AppDbContext _context;

        public SalesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetVendorSales()
        {
            int? vendorId = HttpContext.Session.GetInt32("VendorID");
            if (vendorId == null)
                return Unauthorized();

            var sales = _context.Sales.Where(s => s.VendorId == vendorId).ToList();
            return Ok(sales);
        }
    }
}

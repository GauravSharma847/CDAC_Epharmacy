// Controllers/NetworkTrafficController.cs
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace Login_authentication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NetworkTrafficController : ControllerBase
    {
        [HttpGet("line")]
        public IActionResult GetLineData()
        {
            var lineData = new
            {
                labels = new[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" },
                datasets = new[]
                {
                    new {
                        label = "Visitors per Month",
                        data = new[] { 1500, 1200, 1800, 1300, 1600, 2000, 1700, 1900, 2100, 2200, 2300, 2400 },
                        borderColor = "#4bc0c0",
                        backgroundColor = "rgba(75, 192, 192, 0.2)",
                        fill = true,
                        tension = 0.3
                    }
                }
            };
            return Ok(lineData);
        }

        [HttpGet("bar")]
        public IActionResult GetBarData()
        {
            var barData = new
            {
                labels = new[] { "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" },
                datasets = new[]
                {
                    new {
                        label = "Daily Clicks",
                        data = new[] { 50, 60, 70, 80, 90, 100, 110 },
                        backgroundColor = "#ffcc00",
                        borderColor = "#ffcc00",
                        borderWidth = 1
                    }
                }
            };
            return Ok(barData);
        }

        [HttpGet("doughnut")]
        public IActionResult GetDoughnutData()
        {
            var doughnutData = new
            {
                labels = new[] { "Direct", "Referral", "Organic", "Social Media", "Other" },
                datasets = new[]
                {
                    new {
                        label = "Traffic Sources",
                        data = new[] { 4000, 3000, 2000, 1500, 1000 },
                        backgroundColor = new[] { "#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#ff9f40" },
                        hoverOffset = 4
                    }
                }
            };
            return Ok(doughnutData);
        }
    }
}

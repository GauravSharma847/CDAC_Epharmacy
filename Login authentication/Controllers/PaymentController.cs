using Microsoft.AspNetCore.Mvc;
using Razorpay.Api;
using System;
using System.Collections.Generic;
using MySql.Data.MySqlClient;
using Microsoft.Extensions.Configuration;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly string razorpayKey;
        private readonly string razorpaySecret;
        private readonly string connectionString;

        public PaymentsController(IConfiguration configuration)
        {
            razorpayKey = configuration["Razorpay:Key"];
            razorpaySecret = configuration["Razorpay:Secret"];
            connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        // **1️⃣ API to Create Order**
        [HttpPost("create-order")]
        public IActionResult CreateOrder([FromBody] OrderRequest request)
        {
            try
            {
                RazorpayClient client = new RazorpayClient(razorpayKey, razorpaySecret);

                Dictionary<string, object> options = new Dictionary<string, object>
                {
                    { "amount", request.Amount * 100 },  // Amount in paise
                    { "currency", "INR" },
                    { "receipt", Guid.NewGuid().ToString() },
                    { "payment_capture", 1 }
                };

                Order order = client.Order.Create(options);

                return Ok(new { orderId = order["id"].ToString() });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        // **2️⃣ API to Verify Payment**
        [HttpPost("verify-payment")]
        public IActionResult VerifyPayment([FromBody] PaymentVerificationRequest request)
        {
            try
            {
                RazorpayClient client = new RazorpayClient(razorpayKey, razorpaySecret);
                Payment payment = client.Payment.Fetch(request.PaymentId);

                if (payment["status"].ToString() == "captured")
                {
                    using (MySqlConnection conn = new MySqlConnection(connectionString))
                    {
                        string query = "INSERT INTO transactions (user_id, amount, payment_id, order_id, status) VALUES (@userId, @amount, @paymentId, @orderId, 'Success')";
                        MySqlCommand cmd = new MySqlCommand(query, conn);

                        cmd.Parameters.AddWithValue("@userId", request.UserId);
                        cmd.Parameters.AddWithValue("@amount", Convert.ToDecimal(payment["amount"]) / 100);
                        cmd.Parameters.AddWithValue("@paymentId", request.PaymentId);
                        cmd.Parameters.AddWithValue("@orderId", request.OrderId);

                        conn.Open();
                        cmd.ExecuteNonQuery();
                    }

                    return Ok(new { message = "Payment successful" });
                }
                return BadRequest(new { error = "Payment verification failed" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }

    // Request Models
    public class OrderRequest
    {
        public decimal Amount { get; set; }
    }

    public class PaymentVerificationRequest
    {
        public string PaymentId { get; set; }
        public string OrderId { get; set; }
        public int UserId { get; set; }
    }
}

using BCrypt.Net;
using Login_authentication.Models;
using System.Collections.Generic;
using System.Linq;

namespace Login_authentication.Services
{
    public class UserService
    {
        // A sample list of users with hashed passwords (using BCrypt hashing)
        private static readonly List<User> Users = new()
        {
            // Storing hashed passwords (in practice, you should hash these during registration)
            new User { Email = "admin@example.com", Password = BCrypt.Net.BCrypt.HashPassword("admin123"), UserType = UserType.Admin },
            new User { Email = "vendor@example.com", Password = BCrypt.Net.BCrypt.HashPassword("vendor123"), UserType = UserType.Vendor },
            new User { Email = "customer@example.com", Password = BCrypt.Net.BCrypt.HashPassword("customer123"), UserType = UserType.Customer }
        };

        // Method to validate user based on email and password
        public User? ValidateUser(string email, string password)
        {
            var user = Users.FirstOrDefault(u => u.Email == email);
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return user;  // Valid user
            }
            return null;  // Invalid user
        }
    }
}

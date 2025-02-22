using Microsoft.EntityFrameworkCore;
using System;

namespace Login_authentication.Models
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<VendorProduct> VendorProducts { get; set; }
        public DbSet<MainProduct> MainProducts { get; set; }
        public DbSet<CartItem> CartItems { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public IEnumerable<object> Products { get; internal set; }
        public DbSet<Order> Orders { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Convert Enum to String in Database and vice versa
            modelBuilder.Entity<User>()
                .Property(u => u.UserType)
                .HasConversion(
                    v => v.ToString(),  // Convert enum to string for the database
                     v => (UserType)Enum.Parse(typeof(UserType), v)  // Convert string to enum for C#
                );

            // Foreign key relationship between VendorProducts and Users (Vendors)
            modelBuilder.Entity<VendorProduct>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(vp => vp.VendorId)
                .OnDelete(DeleteBehavior.Cascade);

            // Foreign key relationship between MainProducts and VendorProducts
            modelBuilder.Entity<MainProduct>()
                .HasOne<VendorProduct>()
                .WithMany()
                .HasForeignKey(mp => mp.VendorProductId)  // Make sure this is properly referencing VendorProductId
                .OnDelete(DeleteBehavior.Cascade);

            // Foreign key relationship between CartItems and Users (Customers)
            modelBuilder.Entity<CartItem>()
                .HasOne<User>()
                .WithMany()
                .HasForeignKey(ci => ci.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);

            // Foreign key relationship between CartItems and MainProducts
            modelBuilder.Entity<CartItem>()
                .HasOne<MainProduct>()
                .WithMany()
                .HasForeignKey(ci => ci.ProductId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MainProduct>()
               .HasOne(mp => mp.VendorProduct)
               .WithMany() // Or .WithOne() if the reverse relationship is one-to-one
               .HasForeignKey(mp => mp.VendorProductId)
               .OnDelete(DeleteBehavior.Restrict); // Or another delete behavior based on your needs

            modelBuilder.Entity<MainProduct>()
                .HasOne(mp => mp.VendorProduct)
                .WithMany() // Assuming one-to-many relation
                .HasForeignKey(mp => mp.VendorProductId)
                .OnDelete(DeleteBehavior.Restrict); // Modify the delete behavior as needed

        }

    }
}

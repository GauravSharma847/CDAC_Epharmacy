using Login_authentication.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// ✅ Load Configuration
builder.Configuration.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

// ✅ Add services to the container
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ✅ Add CORS policy (Allow only frontend URL)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:5173") // Replace with deployed frontend URL
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials()); // Allow cookies for session-based auth

    options.AddPolicy("AllowFrontend",
            builder => builder
                .WithOrigins("http://localhost:5173") // Allow your frontend
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials());

    options.AddPolicy("AllowAllOrigins", builder =>
            builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// ✅ Add session support
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Set session timeout
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
    options.Cookie.SameSite = SameSiteMode.Strict; // Prevent CSRF attacks
});

// ✅ Add MySQL database connection
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    )
);

var app = builder.Build();

// ✅ Enable Swagger in Development mode
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ Middleware pipeline
app.UseCors("AllowFrontend"); // Enable CORS for frontend
app.UseCors("AllowAllOrigins");
app.UseSession(); // Enable session middleware
app.UseHttpsRedirection(); // ✅ Ensure HTTPS is enforced
app.UseAuthorization();
app.MapControllers();

// ✅ Run the app
app.Run();

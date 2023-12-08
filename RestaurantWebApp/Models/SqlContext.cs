using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace RestaurantWebApp.Models
{
    public class SqlContext : DbContext
    {
        public DbSet<Item> Items { get; set; }

        public SqlContext(DbContextOptions options) : base(options) { }

    }
}

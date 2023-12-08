using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace RestaurantWebApp.Models
{
    public class SqliteContext : DbContext
    {
        public DbSet<Item> Items { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=OrderDatabase.db");
        }
    }
}

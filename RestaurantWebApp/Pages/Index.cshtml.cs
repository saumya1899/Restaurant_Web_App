using RestaurantWebApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System;

namespace RestaurantWebApp.Pages
{
    public class IndexModel : PageModel
    {
        private readonly SqliteContext _context;

        public IndexModel(SqliteContext context)
        {
            _context = context;
        }

        public IList<Item> Items { get; set; }

        public async Task OnGetAsync()
        {
            Items = await _context.Items.ToListAsync();
        }
        public async Task<IActionResult> OnPostAddProductAsync(string itemName)
        {
            var item = new Item { Name = itemName };
            // Set other properties as needed

            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return RedirectToPage();
        }
        public async Task<IActionResult> OnPostWipeDatabaseAsync()
        {
            _context.Items.RemoveRange(_context.Items);
            await _context.SaveChangesAsync();

            return RedirectToPage();
        }
    }
}
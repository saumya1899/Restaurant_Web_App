using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantWebApp.Data;
using RestaurantWebApp.Models;
using System.Diagnostics;

namespace RestaurantWebApp.Controllers;




public class CategoryController : Controller
{
    private readonly ILogger<CategoryController> _logger;
    private readonly ApplicationDbContext _context;

    public CategoryController(ILogger<CategoryController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task<IActionResult> AppetizersAsync()
    {
        return View();
    }

    public IActionResult Beverages()
    {
        return View();
    }

    public IActionResult Desserts()
    {
        return View();
    }

    public IActionResult MainCourses()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }


}




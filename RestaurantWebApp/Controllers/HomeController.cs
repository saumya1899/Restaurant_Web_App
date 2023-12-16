using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestaurantWebApp.Data;
using RestaurantWebApp.Models;

namespace RestaurantWebApp.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly ApplicationDbContext _context;
    private string CurrentName;

    public HomeController(ILogger<HomeController> logger, ApplicationDbContext context)
    {
        _logger = logger;
        _context = context;
    }

    public async Task<IActionResult> IndexAsync()
    {
        var viewModel = new IndexViewModel
        {
            Orders = await GetOrdersAsync()
        };

        return View(viewModel);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    public IActionResult Menu()
    {
        return View();
    }

    public async Task<IActionResult> CartAsync()
    {
        var viewModel = new IndexViewModel
        {
            Orders = await GetOrdersAsync()
        };

        return View(viewModel);
    }

    public async Task<IActionResult> ConfirmationAsync(string orderCustomerNameToDisplay)
    {
        var viewModel = new IndexViewModel
        {
            Orders = await GetOrdersByNameAsync(orderCustomerNameToDisplay)
        };
        CurrentName = orderCustomerNameToDisplay;
        return View(viewModel);
    }

    private async Task<List<Order>> GetOrdersAsync()
    {
        return await _context.Orders.ToListAsync();
    }

    private async Task<List<Order>> GetOrdersByNameAsync(string orderCustomerNameToGet)
    {
        return await _context.Orders
            .Where(order => order.OrderCustomerName == orderCustomerNameToGet)
            .ToListAsync();
    }


    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }


    [HttpPost]
    public async Task<IActionResult> AddProduct(string orderJSON, string orderCustomerName, string orderSubtotal)
    {
        var order = new Order { OrderJSON = orderJSON, OrderCustomerName = orderCustomerName, OrderSubtotal = orderSubtotal };

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        return RedirectToAction("Confirmation", new { orderCustomerNameToDisplay = orderCustomerName });
    }

    [HttpPost]
    public async Task<IActionResult> WipeDatabase()
    {
        foreach (var item in _context.Orders)
        {
            _context.Orders.Remove(item);
        }
        await _context.SaveChangesAsync();

        return RedirectToAction("Confirmation");
    }

    [HttpPost]
    public async Task<IActionResult> DeleteUserOrders()
    {
        foreach (var item in _context.Orders.Where(o => o.OrderCustomerName == CurrentName).ToList())
        {
            _context.Orders.Remove(item);
        }
        await _context.SaveChangesAsync();

        return RedirectToAction("Confirmation");
    }


}


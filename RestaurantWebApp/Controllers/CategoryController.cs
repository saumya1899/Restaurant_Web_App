using Microsoft.AspNetCore.Mvc;

namespace RestaurantWebApp.Controllers;




    public class CategoryController : Controller
    {
        public IActionResult Appetizers()
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

}




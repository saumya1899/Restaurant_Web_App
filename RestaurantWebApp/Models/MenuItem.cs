namespace RestaurantWebApp.Models;

public class MenuItem
{
    public string? Id { get; set; }
    public string? name { get; set; }
    public string? price { get; set; }
    public NutritionalInfo? nutritionalInfo { get; set; }
    public bool? inStock { get; set; }
}

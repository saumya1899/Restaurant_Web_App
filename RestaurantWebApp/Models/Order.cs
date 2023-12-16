namespace RestaurantWebApp.Models
{
    public class Order
    {
        public int Id { get; set; }
        public string OrderCustomerName { get; set; }
        public string OrderJSON { get; set; }
        public string OrderSubtotal { get; set; }

    }
}

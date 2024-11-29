using System.Collections.Generic;

namespace DAL.RequestDTO
{
    public class OrderManufacturingDTO
    {
        public long? OrderID { get; set; }

        public List<string> Item { get; set; }
    }
    public class OrderManufacturingGetDTO
    {
        public long? OrderID { get; set; }

        public string Item { get; set; }
    }
}

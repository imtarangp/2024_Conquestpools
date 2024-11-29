using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("OrderManufacturingTbl")]
    public class OrderManufacturing
    {
        public long ID { get; set; }

        public long? OrderID { get; set; }

        public string Item { get; set; }

        //[Key, Required]
        //public long ID { get; set; }
        //[Required]
        //public long OrderID { get; set; }
        //[Required, MaxLength(50)]
        //public string Item { get; set; }
    }
}

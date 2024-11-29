using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("ConquestDealerTbl")]
    public class DealerTbl
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public int? Postcode { get; set; }
        public string? Phone { get; set; }
        public string? Pricing { get; set; }
        public string? NicName { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public bool? Disabled { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("UserTbl")]
    public class User
    {
        public int ID { get; set; }
        [Required]
        public string UserName { get; set; }
        public string Dealer { get; set; }
        [Required]
        public string Password { get; set; }
        public string? EmployeeName { get; set; }
    }
}

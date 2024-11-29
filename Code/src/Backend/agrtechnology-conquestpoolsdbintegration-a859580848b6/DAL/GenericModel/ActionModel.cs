using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.GenericModel
{
    public class ActionModel
    {
        [Required]
        public bool Active { get; set; }
        [NotMapped]
        public int IsSave { get; set; }
        [Required]
        public int CreatedBy { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }      
        public int? Editby { get; set; }       
        public DateTime? EditDate { get; set; }
    }
}

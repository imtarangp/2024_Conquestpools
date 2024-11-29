using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.RequestDTO
{
   public class SearchPaginationDTO
    {
        public long ID { get; set; }

        public string OrderID { get; set; }

        public string SerialNumber { get; set; }
    }
}

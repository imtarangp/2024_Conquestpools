using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;

namespace DAL.Entities
{
  public  class SelectCommonListModel
    {
        public long ID { get; set; }

        public string OrderID { get; set; }

        public string SerialNumber { get; set; }

        //public DataTable dataTable { get; set; }
    }
}

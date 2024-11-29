using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.RequestDTO
{
   public class OrderImageItemsDTO
    {
        public long ID { get; set; }

        public long? OrderID { get; set; }

        public float? Height { get; set; }

        public float? Width { get; set; }

        public float? ItemLeft { get; set; }

        public float? ItemTop { get; set; }

        public float? X1 { get; set; }

        public float? Y1 { get; set; }

        public float? X2 { get; set; }

        public float? Y2 { get; set; }

        public string Description { get; set; }

        public string ItemName { get; set; }

        public string ItemStroke { get; set; }

        public int? ItemStrokeThickness { get; set; }

        public string ItemFill { get; set; }

        public int? ItemFont { get; set; }

        public string ItemWeight { get; set; }

        public int? ZOrder { get; set; }

        public string DataType { get; set; }

        public string ItemLineType { get; set; }
    }
}

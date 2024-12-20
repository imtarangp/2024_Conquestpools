﻿using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("OrderImageItemsTbl")]
    public class OrderImageItems
    {
        public long ID { get; set; }
        public long? OrderID { get; set; }
        public float? Height { get; set; }
        public float? Width { get; set; }
        public float? ItemLeft { get; set; }
        public float? ItemTop { get; set; }
        public float? X { get; set; }
        public float? Y { get; set; }
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

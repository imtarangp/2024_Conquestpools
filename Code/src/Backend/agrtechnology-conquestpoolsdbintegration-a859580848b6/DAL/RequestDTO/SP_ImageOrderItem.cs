namespace DAL.RequestDTO
{
    public class SP_ImageOrderItem
    {
        public long ID { get; set; }
        public long? OrderID { get; set; }
        public double? Height { get; set; }
        public double? Width { get; set; }
        public double? ItemLeft { get; set; }
        public double? ItemTop { get; set; }
        public double? X { get; set; }
        public double? Y { get; set; }
        public double? X2 { get; set; }
        public double? Y2 { get; set; }
        public string? Description { get; set; }
        public string? ItemName { get; set; }
        public string? ItemStroke { get; set; }
        public int? ItemStrokeThickness { get; set; }
        public string? ItemFill { get; set; }
        public int? ItemFont { get; set; }
        public string? ItemWeight { get; set; }
        public int? ZOrder { get; set; }
        public string? DataType { get; set; }
        public string? ItemLineType { get; set; }
    }
}

using System.Collections.Generic;

namespace DAL.RequestDTO
{
    public class DiagramRequestDTO
    {
        public long OrderId { get; set; }
        public string? Signature { get; set; }
        public List<ShallowDeep>? list { get; set; }
    }
    public class ShallowDeep
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
    }
}

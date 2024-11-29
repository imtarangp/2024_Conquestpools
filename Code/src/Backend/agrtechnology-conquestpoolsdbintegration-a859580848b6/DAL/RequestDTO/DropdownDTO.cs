using System;

namespace DAL.RequestDTO
{
    public class AccessoriesItemDTO
    {
        public int ID { get; set; }
        public string? Item { get; set; }
    }
    public class BlanketRollerDTO
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public decimal? Cost { get; set; }
    }
    public class ConquestDealerDTO
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public string? City { get; set; }
        public int? Postcode { get; set; }
        public string? Phone { get; set; }
        public string? Pricing { get; set; }
        public string? NicName { get; set; }
    }
    public class EmployeeDTO
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? NicName { get; set; }
        public string? Mobile { get; set; }
        public string? Licence { get; set; }
    }
    public class HandoverKitDTO
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public decimal? Cost { get; set; }
    }
    public class HeatingDTO
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public decimal? Cost { get; set; }
    }
    public class ManufacturingItemDTO
    {
        public long ID { get; set; }
        public string Item { get; set; }
    }
    public class PipeDTO
    {
        public long ID { get; set; }
        public string? Item { get; set; }
        public decimal? Cost { get; set; }
    }
    public class PoolColourDTO
    {
        public long ID { get; set; }
        public string? Colour { get; set; }
    }
    public class PoolLightsDTO
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public decimal? Cost { get; set; }
    }
    public class PoolSaltDTO
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public decimal? Cost { get; set; }
    }
    public class PoolShapeDTO
    {
        public long ID { get; set; }
        public string? Shape { get; set; }
    }
    public class PoolSizeDTO
    {
        public long ID { get; set; }
        public string? Size { get; set; }
    }
    public class SerialNumberDTO
    {
        public long ID { get; set; }
        public long? SerialNumber { get; set; }
        public DateTime? DateCreated { get; set; }
    }
    public class SkimmerDTO
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public decimal? Cost { get; set; }
    }
    public class SpaJetsDTO
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public decimal? Cost { get; set; }
    }
    public class TransformerDTO
    {
        public int ID { get; set; }
        public string? Name { get; set; }
        public decimal? Cost { get; set; }
    }
    public class PumpDTO
    {
        public long ID { get; set; }
        public string? Name { get; set; }
        public decimal? Cost { get; set; }
    }
}

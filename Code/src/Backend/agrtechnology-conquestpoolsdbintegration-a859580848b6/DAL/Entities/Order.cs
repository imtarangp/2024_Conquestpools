using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities
{
    [Table("OrderTbl")]
    public class Order
    {
        public long ID { get; set; }

        public string SerialNumber { get; set; }

        public string Customer { get; set; }

        public string CustomerMobileNumber { get; set; }

        public string CustomerEmail { get; set; }

        public string CustomerDeliveryAddress { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public int? Postcode { get; set; }

        public string CustomerPostalAddress { get; set; }

        public bool? KitPool { get; set; }

        public string Dealer { get; set; }

        public DateTime? SlotDate { get; set; }

        public string PoolShape { get; set; }

        public string PoolSize { get; set; }

        public string PoolColour { get; set; }

        public string? PoolDeliveredEarlytoSite { get; set; }

        public DateTime? PoolDeliveredEarlytoSiteDate { get; set; }

        public string? PoolDeliveredInAfternoon { get; set; }

        public string? ConquestRequiredtoLiftPoolIntoHoleOnSite { get; set; }

        public string IsPoolMeetingCrane { get; set; }

        public string IsPoolMeetingCraneTime { get; set; }

        public bool? FullInFloorCleaning { get; set; }

        public string FittingsColour { get; set; }

        public string PrePlumb { get; set; }

        public string SolarSuctionFittingsColour { get; set; }

        public string OtherInstructions { get; set; }

        public string Skimmer { get; set; }

        public string PoolLights { get; set; }

        public int? PoolLightsQty { get; set; }

        public string SpaJets { get; set; }

        public int? SpaJetsQty { get; set; }

        public string Pipeing { get; set; }

        public int? PipeQty { get; set; }

        public string Heating { get; set; }

        public string BlanketRoller { get; set; }

        public string HandoverKit { get; set; }

        public string PoolSalt { get; set; }

        public string AccAditionalOptions { get; set; }

        public string ManufacturingNotes { get; set; }

        public bool? ConstructionStatus { get; set; }

        public int? ScheduleOrder { get; set; }

        public bool? OrderComplete { get; set; }

        public string TrimPoolOnly { get; set; }

        public string CutSkimmer { get; set; }

        public string InstallHydro { get; set; }

        public string InFloorPrePlumbNo { get; set; }

        public string StdPrePlumb { get; set; }

        public string PrePlumbSolarMainDrain { get; set; }

        public string Driver { get; set; }

        public string DepartureTime { get; set; }

        public string ProductionColor { get; set; }

        public string ScheduleNotes { get; set; }

        public bool? FaultyMold { get; set; }

        public bool? IntheWings { get; set; }

        public bool? Approved { get; set; }

        public int? PoolSaltQty { get; set; }
        public string Pipeing2 { get; set; }
        public int? Pipeing2Qty { get; set; }
        public string Transformer { get; set; }
        public string? Signature { get; set; }
        public string? DeclinedOrderInfo { get; set; }
        public string? OrderStatus { get; set; }
        public string? EmployeeName { get; set; }
        public DateTime? OrderCreatedDate { get; set; }
    }
}

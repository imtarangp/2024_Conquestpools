using DAL.ADOService;
using DAL.DataContext;
using DAL.RequestDTO;
using Dtos.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLL.OrderManager
{
    public class OrderManager : ADOService
    {
        readonly LoggedInUser _LoggedInUser;

        public OrderManager()
        {

        }
        public OrderManager(LoggedInUser loggedInUser)
        {
            this._LoggedInUser = loggedInUser;
        }

        public async Task<List<OrderDTO>> SelectAll(long OrderID)
        {
            var pQ = BuilQP("USP_Order_Get", new List<ProcParams> {
                        new ProcParams{Name = "@ID", Val = OrderID },
                        new ProcParams{Name = "@Dealer", Val = _LoggedInUser.Dealer }
                    });
            return await ExecuteQueryCommandAsync<OrderDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<OrderDeclinedDTO>> DeclinedOrder()
        {
            var pQ = BuilQP("USP_Order_Declined_Get", new List<ProcParams> {
                        new ProcParams{Name = "@Dealer", Val = _LoggedInUser.Dealer }
                    });
            return await ExecuteQueryCommandAsync<OrderDeclinedDTO>(pQ.Query, pQ.Parameters);
        }

        public async Task<List<OrderSeacrhDTO>> OrderSearch(string serach)
        {
            var pQ = BuilQP("sp_GetOrderBySearch", new List<ProcParams> {
                        new ProcParams{Name = "@search", Val = serach },
                        new ProcParams{Name = "@Dealer", Val = _LoggedInUser.Dealer }
                    });
            return await ExecuteQueryCommandAsync<OrderSeacrhDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<PendingOrderDTO>> PendingOrders()
        {
            var pQ = BuilQP("USP_Order_Get_PendingOrders", new List<ProcParams>
            {
                        new ProcParams{Name = "@Dealer", Val = _LoggedInUser.Dealer }
            });
            return await ExecuteQueryCommandAsync<PendingOrderDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<List<PendingOrderDTO>> ApprovedOrders()
        {
            var pQ = BuilQP("USP_Order_Get_ApprovedOrders", new List<ProcParams>
            {
                        new ProcParams{Name = "@Dealer", Val = _LoggedInUser.Dealer }
            });
            return await ExecuteQueryCommandAsync<PendingOrderDTO>(pQ.Query, pQ.Parameters);
        }
        public async Task<object> get()
        {
            using (var _context = DB.Create())
            {
                return await _context.Orders.ToListAsync();
            }
        }
        public async Task<long> SaveOrder(DAL.RequestDTO.OrderDTO req)
        {
            using (var _context = DB.Create())
            {
                DAL.Entities.Order model = new DAL.Entities.Order();
                if (req.ID == 0)
                {
                    model.SerialNumber = "";
                    model.Customer = req.Customer;
                    model.CustomerMobileNumber = req.CustomerMobileNumber;
                    model.CustomerEmail = req.CustomerEmail;
                    model.CustomerDeliveryAddress = req.CustomerDeliveryAddress;
                    model.City = req.City;
                    model.State = req.State;
                    model.Postcode = req.Postcode;
                    model.CustomerPostalAddress = req.CustomerPostalAddress;
                    model.KitPool = req.KitPool;
                    model.Dealer = _LoggedInUser.Dealer;
                    model.SlotDate = req.SlotDate;
                    model.PoolShape = req.PoolShape;
                    model.PoolSize = req.PoolSize;
                    model.PoolColour = req.PoolColour;
                    model.PoolDeliveredEarlytoSite = req.PoolDeliveredEarlytoSite;
                    model.PoolDeliveredEarlytoSiteDate = req.PoolDeliveredEarlytoSiteDate;
                    model.PoolDeliveredInAfternoon = req.PoolDeliveredInAfternoon;
                    model.ConquestRequiredtoLiftPoolIntoHoleOnSite = req.ConquestRequiredtoLiftPoolIntoHoleOnSite;
                    model.IsPoolMeetingCrane = req.IsPoolMeetingCrane;
                    model.IsPoolMeetingCraneTime = req.IsPoolMeetingCraneTime;
                    model.FullInFloorCleaning = req.FullInFloorCleaning;
                    model.FittingsColour = req.FittingsColour;
                    model.PrePlumb = req.PrePlumb;
                    model.SolarSuctionFittingsColour = req.SolarSuctionFittingsColour;
                    model.OtherInstructions = req.OtherInstructions;
                    model.Skimmer = req.Skimmer;
                    model.PoolLights = req.PoolLights;
                    model.PoolLightsQty = req.PoolLightsQty;
                    model.SpaJets = req.SpaJets;
                    model.SpaJetsQty = req.SpaJetsQty;
                    model.Pipeing = req.Pipeing;
                    model.PipeQty = req.PipeQty;
                    model.Heating = req.Heating;
                    model.BlanketRoller = req.BlanketRoller;
                    model.HandoverKit = req.HandoverKit;
                    model.PoolSalt = req.PoolSalt;
                    model.AccAditionalOptions = req.AccAditionalOptions;
                    model.ManufacturingNotes = req.ManufacturingNotes;
                    model.ConstructionStatus = req.ConstructionStatus;
                    model.ScheduleOrder = req.ScheduleOrder;
                    model.OrderComplete = req.OrderComplete;
                    model.TrimPoolOnly = req.TrimPoolOnly;
                    model.CutSkimmer = req.CutSkimmer;
                    model.InstallHydro = req.InstallHydro;
                    model.InFloorPrePlumbNo = req.InFloorPrePlumbNo;
                    model.StdPrePlumb = req.StdPrePlumb;
                    model.PrePlumbSolarMainDrain = req.PrePlumbSolarMainDrain;
                    model.Driver = req.Driver;
                    model.DepartureTime = req.DepartureTime;
                    model.ProductionColor = req.ProductionColor;
                    model.ScheduleNotes = req.ScheduleNotes;
                    model.FaultyMold = req.FaultyMold;
                    model.IntheWings = req.IntheWings;
                    model.Approved = req.Approved;
                    model.PoolSaltQty = req.PoolSaltQty;
                    model.Pipeing2 = req.Pipeing2;
                    model.Pipeing2Qty = req.Pipeing2Qty;
                    model.Transformer = req.Transformer;
                    model.EmployeeName = _LoggedInUser.EmployeeName;
                    model.OrderCreatedDate = DateTime.Now;
                    await _context.Orders.AddAsync(model);
                    _context.SaveChanges();
                }
                else
                {
                    var ml = await _context.Orders.Where(x => x.ID == req.ID).FirstOrDefaultAsync();
                    if (ml != null)
                    {
                        model.ID = ml.ID;
                        ml.Customer = req.Customer;
                        ml.CustomerMobileNumber = req.CustomerMobileNumber;
                        ml.CustomerEmail = req.CustomerEmail;
                        ml.CustomerDeliveryAddress = req.CustomerDeliveryAddress;
                        ml.City = req.City;
                        ml.State = req.State;
                        ml.Postcode = req.Postcode;
                        ml.CustomerPostalAddress = req.CustomerPostalAddress;
                        ml.KitPool = req.KitPool;
                        ml.Dealer = _LoggedInUser.Dealer;
                        ml.SlotDate = req.SlotDate;
                        ml.PoolShape = req.PoolShape;
                        ml.PoolSize = req.PoolSize;
                        ml.PoolColour = req.PoolColour;
                        ml.PoolDeliveredEarlytoSite = req.PoolDeliveredEarlytoSite;
                        ml.PoolDeliveredEarlytoSiteDate = req.PoolDeliveredEarlytoSiteDate;
                        ml.PoolDeliveredInAfternoon = req.PoolDeliveredInAfternoon;
                        ml.ConquestRequiredtoLiftPoolIntoHoleOnSite = req.ConquestRequiredtoLiftPoolIntoHoleOnSite;
                        ml.IsPoolMeetingCrane = req.IsPoolMeetingCrane;
                        ml.IsPoolMeetingCraneTime = req.IsPoolMeetingCraneTime;
                        ml.FullInFloorCleaning = req.FullInFloorCleaning;
                        ml.FittingsColour = req.FittingsColour;
                        ml.PrePlumb = req.PrePlumb;
                        ml.SolarSuctionFittingsColour = req.SolarSuctionFittingsColour;
                        ml.OtherInstructions = req.OtherInstructions;
                        ml.Skimmer = req.Skimmer;
                        ml.PoolLights = req.PoolLights;
                        ml.PoolLightsQty = req.PoolLightsQty;
                        ml.SpaJets = req.SpaJets;
                        ml.SpaJetsQty = req.SpaJetsQty;
                        ml.Pipeing = req.Pipeing;
                        ml.PipeQty = req.PipeQty;
                        ml.Heating = req.Heating;
                        ml.BlanketRoller = req.BlanketRoller;
                        ml.HandoverKit = req.HandoverKit;
                        ml.PoolSalt = req.PoolSalt;
                        ml.AccAditionalOptions = req.AccAditionalOptions;
                        ml.ManufacturingNotes = req.ManufacturingNotes;
                        ml.ConstructionStatus = req.ConstructionStatus;
                        ml.ScheduleOrder = req.ScheduleOrder;
                        ml.OrderComplete = req.OrderComplete;
                        ml.TrimPoolOnly = req.TrimPoolOnly;
                        ml.CutSkimmer = req.CutSkimmer;
                        ml.InstallHydro = req.InstallHydro;
                        ml.InFloorPrePlumbNo = req.InFloorPrePlumbNo;
                        ml.StdPrePlumb = req.StdPrePlumb;
                        ml.PrePlumbSolarMainDrain = req.PrePlumbSolarMainDrain;
                        ml.Driver = req.Driver;
                        ml.DepartureTime = req.DepartureTime;
                        ml.ProductionColor = req.ProductionColor;
                        ml.ScheduleNotes = req.ScheduleNotes;
                        ml.FaultyMold = req.FaultyMold;
                        ml.IntheWings = req.IntheWings;
                        ml.Approved = req.Approved;
                        ml.PoolSaltQty = req.PoolSaltQty;
                        ml.Pipeing2 = req.Pipeing2;
                        ml.Pipeing2Qty = req.Pipeing2Qty;
                        ml.Transformer = req.Transformer;
                        ml.Approved = false;
                        ml.OrderStatus = "Re-Submitted";
                        ml.EmployeeName = _LoggedInUser.EmployeeName;
                        _context.Update(ml);
                        _context.SaveChanges();
                    }
                }
                return model.ID;
            }
        }
        public async Task<bool> SaveDeclinedOrder(DAL.RequestDTO.SaveDeclineDTO req)
        {
            using (var _context = DB.Create())
            {
                var ml = await _context.Orders.Where(x => x.ID == req.ID).FirstOrDefaultAsync();
                if (ml != null)
                {
                    ml.DeclinedOrderInfo = req.DeclinedOrderInfo;
                    ml.OrderStatus = "Declined";

                    _context.Update(ml);
                    _context.SaveChanges();
                }
                return true;
            }
        }
        public async Task<bool> SaveOrder_Old(DAL.Entities.Order model)
        {
            using (var _context = DB.Create())
            {
                await _context.Orders.AddAsync(model);
                _context.SaveChanges();
                return true;
            }
        }
        public async Task<bool> OrderDelete(int Id)
        {
            using (var _context = DB.Create())
            {
                var rec = _context.Orders.FirstOrDefaultAsync(x => x.ID == Id);
                // await _context.Orders.RemoveAsync(rec);
                _context.SaveChanges();
                return true;
            }
        }
        public async Task<bool> SaveOrderManufacturing(DAL.Entities.OrderManufacturing model)
        {
            using (var _context = DB.Create())
            {
                await _context.OrderManufacturings.AddAsync(model);
                _context.SaveChanges();
                return true;
            }
        }
        public async Task<bool> UpdateUnapproved(long id)
        {

            var pQ = BuilQP("USP_Order_ReSubmit_ByOrderID", new List<ProcParams>
            {
                        new ProcParams{Name = "@OrderID", Val = id }
            });
            var ret = await NonQuerySpCommandAsync(pQ.Query, pQ.Parameters);
            if (ret == -1 || ret > 0)
            {
                return true;
            }
            return false;
        }
    }
}


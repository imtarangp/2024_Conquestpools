using DAL.ADOService;
using DAL.DataContext;
using DAL.RequestDTO;
using Dtos.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BLL
{
    public class OrderManufacturingManager : ADOService
    {
        readonly LoggedInUser _LoggedInUser;

        public OrderManufacturingManager()
        {

        }
        public OrderManufacturingManager(LoggedInUser loggedInUser)
        {
            this._LoggedInUser = loggedInUser;
        }
        public async Task<List<OrderManufacturingGetDTO>> SelectOrder(long OrderID)
        {
            var pQ = BuilQP("USP_OrderManufacturing_Get", new List<ProcParams> {
                        new ProcParams{Name = "@OrderID", Val = OrderID }
                        //new ProcParams{Name = "@PageNumber", Val = model.PageNumber },
                        //new ProcParams{Name = "@RecordsPerPgae", Val = model.RecordsPerPgae },
                        //new ProcParams{Name = "@FilterText", Val = model.FilterText }
                    });
            return await ExecuteQueryCommandAsync<OrderManufacturingGetDTO>(pQ.Query, pQ.Parameters);
        }
        //public async Task<object> get()
        //{
        //    using (var _context = DB.Create())
        //    {
        //        return await _context.OrderManufacturings.ToListAsync();
        //    }
        //}
        public async Task<object> get(long OrderID)
        {
            using (var _context = DB.Create())
            {
                return await _context.OrderManufacturings.ToListAsync();
            }
        }
        public async Task<bool> SaveOrderManufacturings(OrderManufacturingDTO req)
        {
            using (var _context = DB.Create())
            {
                if (req.OrderID > 0)
                {
                    var pQ = BuilQP("SP_UpdateOrderManufacturingTbl", new List<ProcParams> {
                        new ProcParams{Name = "@OrderID", Val = req.OrderID }
                    });
                    await ScalarSpCommand(pQ.Query, pQ.Parameters);

                }
                foreach (var item in req.Item)
                {
                    DAL.Entities.OrderManufacturing model = new DAL.Entities.OrderManufacturing();
                    model.OrderID = req.OrderID;
                    model.Item = item;

                    await _context.OrderManufacturings.AddAsync(model);
                    _context.SaveChanges();
                }
                return true;
            }
        }
        public async Task<bool> OrderManufacturingsDelete(int Id)
        {
            using (var _context = DB.Create())
            {
                var rec = await _context.OrderManufacturings.FirstOrDefaultAsync(x => x.ID == Id);
                _context.SaveChanges();
                return true;
            }
        }
        //public async Task<bool> SaveOrderManufacturings(DAL.Entities.OrderManufacturing model)
        //{
        //    using (var _context = DB.Create())
        //    {
        //        await _context.OrderManufacturings.AddAsync(model);
        //        _context.SaveChanges();
        //        return true;
        //    }
        //}
    }
}

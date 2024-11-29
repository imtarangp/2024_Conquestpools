using DAL.ADOService;
using DAL.DataContext;
using DAL.RequestDTO;
using Dtos.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLL
{
    public class OrderImageItemsManager : ADOService
    {
        readonly LoggedInUser _LoggedInUser;

        public OrderImageItemsManager()
        {

        }
        public OrderImageItemsManager(LoggedInUser loggedInUser)
        {
            this._LoggedInUser = loggedInUser;
        }
        public async Task<List<SP_ImageOrderItem>> get(long OrderId)
        {
            var pQ = BuilQP("USP_OrderImageItems_Get", new List<ProcParams> {
                        new ProcParams{Name = "@OrderID", Val = OrderId }
                    });
            return await ExecuteQueryCommandAsync<SP_ImageOrderItem>(pQ.Query, pQ.Parameters);
        }
        public async Task<bool> SaveOrderImageItems(List<DAL.RequestDTO.OrderImageItemsDTO> lst)
        {
            using (var _context = DB.Create())
            {
                try
                {
                    if (lst.Any())
                    {
                        long? id = lst.Select(x => x.OrderID).First();
                        var pQ = BuilQP("SP_UpdateImageItems", new List<ProcParams> {
                        new ProcParams{Name = "@OrderID", Val = id }
                    });
                        await ScalarSpCommand(pQ.Query, pQ.Parameters);

                    }
                    foreach (var req in lst)
                    {
                        DAL.Entities.OrderImageItems model = new DAL.Entities.OrderImageItems();
                        // model.ID = req.ID;
                        model.OrderID = req.OrderID;
                        model.Height = req.Height;
                        model.Width = req.Width;
                        model.ItemLeft = req.ItemLeft;
                        model.ItemTop = req.ItemTop;
                        model.X = req.X1;
                        model.Y = req.Y1;
                        model.X2 = req.X2;
                        model.Y2 = req.Y2;
                        model.Description = req.Description;
                        model.ItemName = req.ItemName;
                        model.ItemStroke = req.ItemStroke;
                        model.ItemStrokeThickness = req.ItemStrokeThickness;
                        model.ItemFill = req.ItemFill;
                        model.ItemFont = req.ItemFont;
                        model.ItemWeight = req.ItemWeight;
                        model.ZOrder = req.ZOrder;
                        model.DataType = req.DataType;
                        model.ItemLineType = req.ItemLineType;
                        await _context.OrderImageItems.AddAsync(model);
                        _context.SaveChanges();
                    }
                }
                catch (Exception ex)
                {

                    throw;
                }
                return true;
            }
        }
        public async Task<bool> SaveOrder_Old(DAL.Entities.OrderImageItems model)
        {
            using (var _context = DB.Create())
            {
                await _context.OrderImageItems.AddAsync(model);
                _context.SaveChanges();
                return true;
            }
        }
        public async Task<bool> OrderDelete(int Id)
        {
            using (var _context = DB.Create())
            {
                var rec = await _context.OrderImageItems.FirstOrDefaultAsync(x => x.ID == Id);
                _context.SaveChanges();
                return true;
            }
        }
        public async Task<bool> SaveOrderImageItems(DAL.Entities.OrderImageItems model)
        {
            using (var _context = DB.Create())
            {
                await _context.OrderImageItems.AddAsync(model);
                _context.SaveChanges();
                return true;
            }
        }

        // Save Diagram and Image

        public async Task<string> SaveDigramAndSignature(DAL.RequestDTO.DiagramRequestDTO req)
        {
            string msg = "Order id is wrong.";
            using (var _context = DB.Create())
            {
                //foreach (var data in req.list)
                //{
                //    DAL.Entities.OrderImageItems model = new DAL.Entities.OrderImageItems();
                //    //model.ID = req.ID;
                //    model.OrderID = req.OrderId;
                //    //model.Height = req.Height;
                //    //model.Width = req.Width;
                //    //model.ItemLeft = req.ItemLeft;
                //    //model.ItemTop = req.ItemTop;
                //    //model.X = req.X;
                //    //model.Y = req.Y;
                //    //model.X2 = req.X2;
                //    //model.Y2 = req.Y2;
                //    model.Description = data.Description;
                //    model.ItemName = data.Title;
                //    //model.ItemStroke = req.ItemStroke;
                //    //model.ItemStrokeThickness = req.ItemStrokeThickness;
                //    //model.ItemFill = req.ItemFill;
                //    //model.ItemFont = req.ItemFont;
                //    //model.ItemWeight = req.ItemWeight;
                //    //model.ZOrder = req.ZOrder;
                //    //model.DataType = req.DataType;
                //    //model.ItemLineType = req.ItemLineType;

                //    await _context.OrderImageItems.AddAsync(model);
                //    _context.SaveChanges();
                //}
                if (!string.IsNullOrEmpty(req.Signature))
                {
                    var rec = await _context.Orders.FirstOrDefaultAsync(x => x.ID == req.OrderId);
                    if (rec != null)
                    {
                        rec.Signature = req.Signature;
                        _context.SaveChanges();
                        msg = "Signature saved successfully.";
                    }
                }
                else
                {
                    msg = "No signature found. It's value is empty.";
                }
                return msg;
            }
        }

    }
}


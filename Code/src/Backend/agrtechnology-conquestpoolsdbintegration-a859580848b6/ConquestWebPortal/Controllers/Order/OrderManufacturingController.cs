using BLL;
using ConquestWebPortal.Attribute;
using DAL.DataContext;
using DAL.RequestDTO;
using Dtos.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace ConquestWebPortal.Controllers.Order
{
    [Route("api/OrderManufacturing")]
    [ApiController]
    [AuthUser]
    public class OrderManufacturingController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Get(long OrderID)
        {
            try
            {
                var result = await new OrderManufacturingManager().SelectOrder(OrderID);
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }

        [HttpPost("OrderManufacturing")]
        public async Task<IActionResult> OrderManufacturing([FromBody] OrderManufacturingDTO model)
        {
            if (!ModelState.IsValid)
            {
                return Ok(_responseModel = new ResponseModel(false, "Validation Failed", null));
            }
            try
            {
                var result = await new OrderManufacturingManager().SaveOrderManufacturings(model);
                if (result == false)
                {
                    _responseModel = new ResponseModel(false, "Some Thing Went wrong.", null);
                }
                else
                {
                    _responseModel = new ResponseModel(true, "Saved Successfully", null);
                }
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing went wrong.", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }

        [HttpDelete("[action]/{Id}")]
        public async Task<bool> OrderManufacturingsDelete(int Id)
        {
            using (var _context = DB.Create())
            {
                var rec = _context.OrderManufacturings.FirstOrDefaultAsync(x => x.ID == Id);
                // await _context.Orders.RemoveAsync(rec);
                _context.SaveChanges();
                return true;
            }
        }
    }
}

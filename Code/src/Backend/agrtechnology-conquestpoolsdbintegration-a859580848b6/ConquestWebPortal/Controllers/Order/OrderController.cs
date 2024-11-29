using BLL.OrderManager;
using ConquestWebPortal.Attribute;
using CoreLibrary.Extension;
using DAL.RequestDTO;
using Dtos.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ConquestWebPortal.Controllers.Order
{
    [Route("api/Order")]
    [ApiController]
    [AuthUser]
    public class OrderController : BaseController
    {
        [HttpGet("Get")]
        public async Task<IActionResult> Get(long OrderID)
        {
            try
            {
                var result = await new OrderManager(User.Identity.LoginInfo()).SelectAll(OrderID);
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("search")]
        public async Task<IActionResult> OrderSearch(string search)
        {
            try
            {
                var result = await new OrderManager(User.Identity.LoginInfo()).OrderSearch(search);
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("PendingOrder")]
        public async Task<IActionResult> PendingOrder()
        {
            try
            {
                var result = await new OrderManager(User.Identity.LoginInfo()).PendingOrders();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("ApprovedOrder")]
        public async Task<IActionResult> ApprovedOrder()
        {
            try
            {
                var result = await new OrderManager(User.Identity.LoginInfo()).ApprovedOrders();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DAL.RequestDTO.OrderDTO model)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.Where(E => E.Errors.Count > 0)
                         .SelectMany(E => E.Errors)
                         .Select(E => E.ErrorMessage)
                         .ToList();
                if (errors.Count > 0)
                {

                }
                return BadRequest(_responseModel = new ResponseModel(false, errors[0], null));
            }
            try
            {
                var result = await new OrderManager(User.Identity.LoginInfo()).SaveOrder(model);
                _responseModel = new ResponseModel(true, "Saved Successfully", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing went wrong.", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpPost("PostOrderDeclined")]
        public async Task<IActionResult> PostOrderDeclined([FromBody] DAL.RequestDTO.SaveDeclineDTO model)
        {
            try
            {
                var result = await new OrderManager(User.Identity.LoginInfo()).SaveDeclinedOrder(model);
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetOrderDeclined")]
        public async Task<IActionResult> GetOrderDeclined()
        {
            try
            {
                var result = await new OrderManager(User.Identity.LoginInfo()).DeclinedOrder();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpPost("UpdateUnapproved")]
        public async Task<IActionResult> UpdateUnapproved(UpdateUnapprovedDTO dTO)
        {
            try
            {
                var result = await new OrderManager().UpdateUnapproved(dTO.ID);
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
    }
}


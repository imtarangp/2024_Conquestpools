using BLL;
using ConquestWebPortal.Attribute;
using Dtos.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConquestWebPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AuthUser]
    public class OrderImageItemsController : BaseController
    {
        [HttpGet]
        public async Task<IActionResult> Get(long orderId)
        {
            try
            {
                var result = await new OrderImageItemsManager().get(orderId);
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
        public async Task<IActionResult> Post([FromBody] List<DAL.RequestDTO.OrderImageItemsDTO> model)
        {
            if (!ModelState.IsValid)
            {
                return Ok(_responseModel = new ResponseModel(false, "Validation Failed", null));
            }
            try
            {
                var result = await new OrderImageItemsManager().SaveOrderImageItems(model);
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
    }
}

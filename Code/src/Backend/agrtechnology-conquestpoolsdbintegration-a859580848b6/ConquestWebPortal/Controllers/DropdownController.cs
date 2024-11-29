using BLL;
using ConquestWebPortal.Attribute;
using Dtos.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ConquestWebPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[AuthUser]
    public class DropdownController : BaseController
    {
        [HttpGet("GetAccessoriesItem")]
        public async Task<IActionResult> GetAccessoriesItem()
        {
            try
            {
                var result = await new DropDownManager().GetAccessoriesItem();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetBlanketRoller")]
        public async Task<IActionResult> GetBlanketRoller()
        {
            try
            {
                var result = await new DropDownManager().GetBlanketRoller();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetConquestDealer")]
        public async Task<IActionResult> GetConquestDealer()
        {
            try
            {
                var result = await new DropDownManager().GetConquestDealer();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetEmployee")]
        public async Task<IActionResult> GetEmployee()
        {
            try
            {
                var result = await new DropDownManager().GetEmployee();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetHandoverKit")]
        public async Task<IActionResult> GetHandoverKit()
        {
            try
            {
                var result = await new DropDownManager().GetHandoverKit();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetHeating")]
        public async Task<IActionResult> GetHeating()
        {
            try
            {
                var result = await new DropDownManager().GetHeating();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetManufacturingItem")]
        public async Task<IActionResult> GetManufacturingItem()
        {
            try
            {
                var result = await new DropDownManager().GetManufacturingItem();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetPipe")]
        public async Task<IActionResult> GetPipe()
        {
            try
            {
                var result = await new DropDownManager().GetPipe();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetPoolColour")]
        public async Task<IActionResult> GetPoolColour()
        {
            try
            {
                var result = await new DropDownManager().GetPoolColour();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetPoolLights")]
        public async Task<IActionResult> GetPoolLights()
        {
            try
            {
                var result = await new DropDownManager().GetPoolLights();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetPoolSalt")]
        public async Task<IActionResult> GetPoolSalt()
        {
            try
            {
                var result = await new DropDownManager().GetPoolSalt();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetPoolShape")]
        public async Task<IActionResult> GetPoolShape()
        {
            try
            {
                var result = await new DropDownManager().GetPoolShape();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetPoolSize")]
        public async Task<IActionResult> GetPoolSize()
        {
            try
            {
                var result = await new DropDownManager().GetPoolSize();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetSerialNumber")]
        public async Task<IActionResult> GetSerialNumber()
        {
            try
            {
                var result = await new DropDownManager().GetSerialNumber();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetSkimmer")]
        public async Task<IActionResult> GetSkimmer()
        {
            try
            {
                var result = await new DropDownManager().GetSkimmer();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetSpaJets")]
        public async Task<IActionResult> GetSpaJets()
        {
            try
            {
                var result = await new DropDownManager().GetSpaJets();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetTransformer")]
        public async Task<IActionResult> GetTransformer()
        {
            try
            {
                var result = await new DropDownManager().GetTransformer();
                _responseModel = new ResponseModel(true, "", result);
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing Went Wrong", e.Message);
                return BadRequest(_responseModel);
            }
            return Ok(_responseModel);
        }
        [HttpGet("GetPump")]
        public async Task<IActionResult> GetPump()
        {
            try
            {
                var result = await new DropDownManager().GetPump();
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

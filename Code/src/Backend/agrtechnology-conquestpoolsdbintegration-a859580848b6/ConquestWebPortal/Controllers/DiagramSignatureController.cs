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
    [AuthUser]
    public class DiagramSignatureController : BaseController
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DAL.RequestDTO.DiagramRequestDTO model)
        {
            if (!ModelState.IsValid)
            {
                return Ok(_responseModel = new ResponseModel(false, "Validation Failed", null));
            }
            try
            {
                var result = await new OrderImageItemsManager().SaveDigramAndSignature(model);
                _responseModel = new ResponseModel(true, "Saved Successfully", result);

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

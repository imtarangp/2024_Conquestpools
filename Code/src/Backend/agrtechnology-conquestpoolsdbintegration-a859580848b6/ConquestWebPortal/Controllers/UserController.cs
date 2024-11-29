using BLL;
using ConquestWebPortal.Attribute;
using Dtos.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace ConquestWebPortal.Controllers
{
    [Route("api/User")]
    [ApiController]
    [AuthUser]
    public class UserController : ControllerBase
    {
        ResponseModel _responseModel = new ResponseModel();
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DAL.Entities.User model)
        {
            if (!ModelState.IsValid)
            {
                var a = ModelState.Values.ToList();
                return Ok(_responseModel = new ResponseModel(false, "Validation Failed", null));
            }
            try
            {
                var result = await new UserManager().SaveUser(model);
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
            }
            return Ok(_responseModel);
        }
    }
}

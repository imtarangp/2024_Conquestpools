using BLL;
using Dtos.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace ConquestWebPortal.Controllers
{
    [Route("api/Account")]
    public class AccountController : ControllerBase
    {
        ResponseModel _responseModel = new ResponseModel();
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginUservm model)
        {
            if (!ModelState.IsValid)
            {
                return Ok(_responseModel = new ResponseModel(false, "Please Enter User Name and Password", null));
            }
            try
            {
                var result = await new AccountManager().Authenticat(model);
                if (result == null)
                {
                    _responseModel = new ResponseModel(false, "No User Exist", null);
                }
                else if (result.UserName == "Password")
                {
                    _responseModel = new ResponseModel(false, "Password Wrong!", null);
                }
                else
                {
                    _responseModel = new ResponseModel(true, "Login Successfull", result);
                    return Ok(_responseModel);
                }
            }
            catch (Exception e)
            {
                _responseModel = new ResponseModel(false, "Some thing went wrong.", e.Message);
            }
            return BadRequest(_responseModel);
        }
    }
}

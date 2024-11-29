using Dtos.Model;
using Microsoft.AspNetCore.Mvc;

namespace ConquestWebPortal.Controllers
{
    //[Attribute.AuthUser]
    public class BaseController : ControllerBase
    {
        protected ResponseModel _responseModel;

        //public ResponseMessages _responseMessages = new ResponseMessages();
    }
}

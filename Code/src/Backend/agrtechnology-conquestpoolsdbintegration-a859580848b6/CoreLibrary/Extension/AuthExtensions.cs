using Dtos.Model;
using System;
using System.Security.Claims;
using System.Security.Principal;

namespace CoreLibrary.Extension
{
    public static class AuthExtensions
    {
        public static LoggedInUser LoginInfo(this IIdentity identity)
        {
            var LoggedInUser = new LoggedInUser()
            {
                UserId = Convert.ToInt32(((ClaimsIdentity)identity).FindFirst("UserId").Value),
                UserName = ((ClaimsIdentity)identity).FindFirst("UserName").Value,
                Dealer = ((ClaimsIdentity)identity).FindFirst("Dealer").Value,
                EmployeeName = ((ClaimsIdentity)identity).FindFirst("EmployeeName").Value
            };
            return LoggedInUser;
        }
    }
}

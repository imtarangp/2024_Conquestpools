using CoreLibrary;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ConquestWebPortal.Attribute
{

    public class AuthUserAttribute : TypeFilterAttribute
    {
        public AuthUserAttribute(string roleNames = "") : base(typeof(AuthUser))
        {
            Arguments = new object[] { roleNames };
        }
    }

    public class AuthUser : IAuthorizationFilter
    {
        readonly string _allowedRoleNames;

        public AuthUser(string roleNames)
        {
            _allowedRoleNames = roleNames;
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var headers = context.HttpContext.Request.Headers;
                if (headers == null)//no headers present, through an error
                {
                    context.Result = new UnauthorizedResult();
                }
                string token = headers["Authorization"];
                if (string.IsNullOrEmpty(token))//no token found, then trough an error
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }
                token = token.Replace("Bearer ", "");
                if (string.IsNullOrEmpty(token))//no token found, then trough an error
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }
                if (IsValidToken(token) == false)//This Will check that token was generated from our system or not, if not , it will kick him out
                {
                    context.Result = new UnauthorizedResult();
                    return;
                }
                JwtSecurityToken tokenDecrypted = handler.ReadToken(token) as JwtSecurityToken;//decrypt the token here
                if (DateTime.UtcNow > tokenDecrypted.ValidTo)//Means token is expired
                {
                    context.Result = new UnauthorizedResult();
                }
                var identity = new ClaimsIdentity(tokenDecrypted.Claims);
                context.HttpContext.User = new ClaimsPrincipal(identity);
            }
            catch (Exception ex)
            {
                // Console.WriteLine(ex.Message);
                context.Result = new ForbidResult();
            }
        }

        protected bool IsValidToken(string token)
        {
            try
            {
                var key = Encoding.ASCII.GetBytes(Constants.JwtSecret);
                var jwtSecretkey = new SymmetricSecurityKey(key);
                var SigningCredentials = new SigningCredentials(
                         jwtSecretkey,
                         SecurityAlgorithms.HmacSha256Signature);

                var handler = new JwtSecurityTokenHandler();
                var tokenSecure = handler.ReadToken(token) as SecurityToken;
                var validations = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = jwtSecretkey,
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
                var claims = handler.ValidateToken(token, validations, out tokenSecure);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}

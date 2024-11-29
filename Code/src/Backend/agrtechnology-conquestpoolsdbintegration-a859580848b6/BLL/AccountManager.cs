using CoreLibrary;
using DAL;
using DAL.DataContext;
using DAL.Entities;
using DAL.RequestDTO;
using DAL.ViewModel.Token;
using Dtos.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public class AccountManager : ClientBaseServices
    {

        readonly LoggedInUser _LoggedInUser;

        public AccountManager()
        {
        }

        public AccountManager(LoggedInUser loggedInUser)
        {
            this._LoggedInUser = loggedInUser;
        }

        public async Task<vmToken> Authenticat(LoginUservm model)
        {
            var passwordHash = model.Password;
            var pQ = BuilQP("SP_Login", new List<ProcParams> {
                        new ProcParams{Name = "@Email", Val = model.UserName }
                    });
            var res = await ExecuteQueryCommandAsync<LoginDTO>(pQ.Query, pQ.Parameters);
            if (!res.Any())
                return null;

            if (res.FirstOrDefault().Password.Trim() != passwordHash.Trim())
            {
                return new vmToken { UserName = "Password" };
            }
            return GenerateNewToken(res.FirstOrDefault());
        }
        private vmToken GenerateNewToken(LoginDTO user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(Constants.JwtSecret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                        new Claim("UserId", user.ID.ToString()),
                        new Claim("UserName", user.UserName),
                        new Claim("Dealer", user.Dealer),
                        new Claim("EmployeeName", user.EmployeeName)
                }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            string tokenStr = tokenHandler.WriteToken(token);
            return new vmToken
            {
                Token = tokenStr,
                UserName = user.UserName
            };
        }
    }
}

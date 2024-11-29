using CoreLibrary;
using DAL.DataContext;
using System.Threading.Tasks;

namespace BLL
{
    public class UserManager
    {
        public async Task<bool> SaveUser(DAL.Entities.User model)
        {
            using (var _context = DB.Create())
            {
                model.Password = Encrypt.EncryptString(model.Password);
                await _context.Users.AddAsync(model);
                _context.SaveChanges();
                return true;
            }
        }
    }
}

using System.ComponentModel.DataAnnotations;

namespace Dtos.Model
{
    public class LoginUservm
    {
        [Required,MaxLength(50)]
        public string UserName { get; set; }
        [Required, MaxLength(200)]
        public string Password { get; set; }
    }
}

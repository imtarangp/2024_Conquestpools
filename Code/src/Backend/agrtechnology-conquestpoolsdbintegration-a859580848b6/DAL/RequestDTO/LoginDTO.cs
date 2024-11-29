namespace DAL.RequestDTO
{
    public class LoginDTO
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string? Password { get; set; }
        public string? Dealer { get; set; }
        public string? EmployeeName { get; set; }
    }
}

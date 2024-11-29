namespace DAL.DataContext
{
    public static class DB
    {
        public static DataContext Create()
        {
            DataContext conn = new DataContext();
            return conn;
        }
    }
}

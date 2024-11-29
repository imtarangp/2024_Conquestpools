using CoreLibrary;
using DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace DAL.DataContext
{
    public class DataContext : DbContext
    {
        public DataContext()
        {

        }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderManufacturing> OrderManufacturings { get; set; }
        public virtual DbSet<OrderImageItems> OrderImageItems { get; set; }
        
        //public virtual DbSet<OrderImageSignatureTbl> OrderImageSignatureTbl { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<DealerTbl> DealerTbl { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(Setting.ConnectionString);
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}

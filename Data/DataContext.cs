using Tree.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Tree.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Node> Node { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Node>(entity =>
            {

                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name).IsRequired();
                //entity.Property(e => e.ParentId).IsRequired(false).HasDefaultValue(null);
                
                entity.HasMany(e => e.Children).WithOne(e => e.Parent).OnDelete(DeleteBehavior.NoAction).IsRequired(false);
                
            });

        }
    }
}
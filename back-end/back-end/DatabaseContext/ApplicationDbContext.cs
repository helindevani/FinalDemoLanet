using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using back_end.Domain.Identity;
using back_end.ServiceContracts;
using back_end.Domain.Entities;
using back_end.Enums;

namespace back_end.DatabaseContext
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {
        }

        public ApplicationDbContext()
        {
            
        }

        public virtual DbSet<Brand> Brands { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<Connection> Connections { get; set; }
        public virtual DbSet<Booking> Bookings { get; set; }
        public virtual DbSet<Staff> Staffs { get; set; }

        public override int SaveChanges()
        {
            UpdateTimeStamp();

            return base.SaveChanges();
        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default)
        {
            UpdateTimeStamp();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        private void UpdateTimeStamp()
        {
            var entries = ChangeTracker
            .Entries()
            .Where(e => e.Entity is IAuditable && (
            e.State == EntityState.Added
            || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                ((IAuditable)entityEntry.Entity).UpdateDate = DateTime.UtcNow;

                if (entityEntry.State == EntityState.Added)
                {
                    ((IAuditable)entityEntry.Entity).CreateDate = DateTime.UtcNow;
                }
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var AdminId = "7DBD5480-1224-4288-AEE8-1249F8A94E1A";
            var UserId = "3AC53885-3553-4B1C-93D2-4DECA3B4CB54";
            var StaffId = "BB8D11C0-9F1A-42D9-ACEB-718B0A679F2B";

            var roles = new List<ApplicationRole>
            {
                new ApplicationRole
                {
                    Id = Guid.Parse(StaffId),
                    ConcurrencyStamp = StaffId,
                    Name = "Staff",
                    NormalizedName = "Staff".ToUpper()
                },
                new ApplicationRole
                {
                    Id = Guid.Parse(AdminId),
                    ConcurrencyStamp = AdminId,
                    Name = "Admin",
                    NormalizedName = "Admin".ToUpper()
                },
                new ApplicationRole
                {
                    Id = Guid.Parse(UserId),
                    ConcurrencyStamp = UserId,
                    Name = "User",
                    NormalizedName = "User".ToUpper()
                }
            };

            modelBuilder.Entity<ApplicationRole>().HasData(roles);



        }

    }
}

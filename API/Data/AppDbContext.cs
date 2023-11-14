using API.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext:IdentityDbContext<User, Role, int>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }
    
    public DbSet<Project> Projects { get; set; }
    public DbSet<Note> Notes { get; set; }
    public DbSet<Bug> Bugs { get; set; }
    public DbSet<Member> Members { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        
        builder.Entity<Role>().HasData(
        new Role
        {
            Id = 1,
            Name = "Member",
            NormalizedName = "MEMBER"
        },
        new Role
        {
            Id = 2,
            Name = "Admin",
            NormalizedName = "ADMIN"
        }
        );
    }
    }


using Eventit.Models;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Eventit.Data;

public partial class EventitDbContext : DbContext
{
    public EventitDbContext()
    {
    }

    public EventitDbContext(DbContextOptions<EventitDbContext> options)
        : base(options)
    {
        Database.Migrate();
    }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<CompanyContactPerson> CompanyContactPeople { get; set; }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<Place> Places { get; set; }

    public virtual DbSet<EventReview> EventReviews { get; set; }

    public virtual DbSet<PlaceReview> PlaceReviews { get; set; }

    public virtual DbSet<Chat> Chats { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<SupportRequest> SupportRequests { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Chat>(entity =>
        {
            entity.Property(e => e.IsPublic)
                  .HasDefaultValue(true);
        });

        modelBuilder.Entity<Company>(entity =>
        {
            entity.Property(e => e.Email)
                  .HasMaxLength(100)
                  .IsUnicode(false);
            entity.Property(e => e.Password)
                  .HasMaxLength(255)
                  .IsUnicode(false);
            entity.Property(e => e.Name)
                  .HasMaxLength(255)
                  .IsUnicode(true);
            entity.Property(e => e.RegistrationDate)
                  .HasDefaultValueSql("(getdate())")
                  .HasColumnType("datetime");
            entity.Property(e => e.RegistrationNumber)
                  .HasMaxLength(50)
                  .IsUnicode(false);

            entity.HasIndex(e => e.Email).IsUnique();
        });

        modelBuilder.Entity<CompanyContactPerson>(entity =>
        {
            entity.Property(e => e.FirstName)
                  .HasMaxLength(50)
                  .IsUnicode(true);
            entity.Property(e => e.LastName)
                  .HasMaxLength(50)
                  .IsUnicode(true);
            entity.Property(e => e.Patronymic)
                  .HasMaxLength(50)
                  .IsUnicode(true);
            entity.Property(e => e.PhoneNumber)
                  .HasMaxLength(20)
                  .IsUnicode(false);
            entity.Property(e => e.Email)
                  .HasMaxLength(100)
                  .IsUnicode(false);
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.Property(e => e.Title)
                  .HasMaxLength(100)
                  .IsUnicode(true);
            entity.Property(e => e.Description)
                  .HasMaxLength(3000)
                  .IsUnicode(true);
            entity.Property(e => e.StartDate)
                  .HasColumnType("datetime");
            entity.Property(e => e.EndDate)
                  .HasColumnType("datetime");
            entity.Property(e => e.EntranceFee)
                  .HasColumnType("decimal(9, 2)");
            entity.Property(e => e.Free)
                  .HasDefaultValueSql("((1))");
            entity.Property(e => e.OnlineEvent)
                  .HasDefaultValueSql("((1))");
        });

        modelBuilder.Entity<EventReview>(entity =>
        {
            entity.Property(e => e.Description)
                  .HasMaxLength(500)
                  .IsUnicode(true);
            entity.Property(e => e.Grade)
                  .HasColumnType("tinyint");
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.Property(e => e.Text)
                  .HasMaxLength(500)
                  .IsUnicode(true);
            entity.Property(e => e.CreationDate)
                  .HasDefaultValueSql("(getdate())")
                  .HasColumnType("datetime");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.Property(e => e.Title)
                  .HasMaxLength(100)
                  .IsUnicode(true);
            entity.Property(e => e.Description)
                  .HasMaxLength(255)
                  .IsUnicode(true);
            entity.Property(e => e.CreationDate)
                  .HasDefaultValueSql("(getdate())")
                  .HasColumnType("datetime");
            entity.Property(e => e.IsRead)
                  .HasDefaultValue(false);
        });

        modelBuilder.Entity<Place>(entity =>
        {
            entity.Property(e => e.Name)
                  .HasMaxLength(100)
                  .IsUnicode(true);
            entity.Property(e => e.Address)
                  .HasMaxLength(255)
                  .IsUnicode(true);
        });

        modelBuilder.Entity<PlaceReview>(entity =>
        {
            entity.Property(e => e.Grade)
                  .HasColumnType("tinyint");
        });

        modelBuilder.Entity<SupportRequest>(entity =>
        {
            entity.Property(e => e.Title)
                  .HasMaxLength(100)
                  .IsUnicode(true);
            entity.Property(e => e.Description)
                  .HasMaxLength(500)
                  .IsUnicode(true);
            entity.Property(e => e.CreationDate)
                  .HasDefaultValueSql("(getdate())")
                  .HasColumnType("datetime");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Email)
                  .HasMaxLength(100)
                  .IsUnicode(false);
            entity.Property(e => e.Password)
                  .HasMaxLength(255)
                  .IsUnicode(false);
            entity.Property(e => e.FirstName)
                  .HasMaxLength(50)
                  .IsUnicode(true);
            entity.Property(e => e.LastName)
                  .HasMaxLength(50)
                  .IsUnicode(true);
            entity.Property(e => e.Patronymic)
                  .HasMaxLength(50)
                  .IsUnicode(true);
            entity.Property(e => e.PhoneNumber)
                  .HasMaxLength(20)
                  .IsUnicode(false);
            entity.Property(e => e.Description)
                  .HasMaxLength(500)
                  .IsUnicode(true);
            entity.Property(e => e.DateOfBirth)
                  .HasColumnType("date");
            entity.Property(e => e.RegistrationDate)
                  .HasDefaultValueSql("(getdate())")
                  .HasColumnType("datetime");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.Property(e => e.Token)
                  .HasMaxLength(500)
                  .IsUnicode(false);
        });
    }
}
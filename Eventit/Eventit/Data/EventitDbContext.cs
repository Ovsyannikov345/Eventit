using Eventit.Models;
using Microsoft.EntityFrameworkCore;

namespace Eventit.Data;

public partial class EventitDbContext : DbContext
{
    public EventitDbContext()
    {
    }

    public EventitDbContext(DbContextOptions<EventitDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Chat> Chats { get; set; }

    public virtual DbSet<Company> Companies { get; set; }

    public virtual DbSet<CompanyContactPerson> CompanyContactPeople { get; set; }

    public virtual DbSet<CompanyProfilePicture> CompanyProfilePictures { get; set; }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<EventPhoto> EventPhotos { get; set; }

    public virtual DbSet<EventReview> EventReviews { get; set; }

    public virtual DbSet<Message> Messages { get; set; }

    public virtual DbSet<MessageSender> MessageSenders { get; set; }

    public virtual DbSet<Organizer> Organizers { get; set; }

    public virtual DbSet<Place> Places { get; set; }

    public virtual DbSet<PlaceReview> PlaceReviews { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserProfilePicture> UserProfilePictures { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Chat>(entity =>
        {
            entity.HasKey(e => e.EventId);

            entity.ToTable("Chat");

            entity.Property(e => e.EventId).ValueGeneratedNever();

            entity.HasOne(d => d.Event).WithOne(p => p.Chat)
                .HasForeignKey<Chat>(d => d.EventId)
                .HasConstraintName("FK_ChatEvent");
        });

        modelBuilder.Entity<Company>(entity =>
        {
            entity.ToTable("Company");

            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.RegistrationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date");
        });

        modelBuilder.Entity<CompanyContactPerson>(entity =>
        {
            entity.ToTable("CompanyContactPerson");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Patronymic).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.CompanyContactPerson)
                .HasForeignKey<CompanyContactPerson>(d => d.Id)
                .HasConstraintName("FK_ContactPersonCompany");
        });

        modelBuilder.Entity<CompanyProfilePicture>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CompanyP__3214EC07959F7D49");

            entity.ToTable("CompanyProfilePicture");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.CompanyProfilePicture)
                .HasForeignKey<CompanyProfilePicture>(d => d.Id)
                .HasConstraintName("FK_ProfilePictureCompany");
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.ToTable("Event");

            entity.Property(e => e.Description).HasMaxLength(300);
            entity.Property(e => e.EndDate).HasColumnType("datetime");
            entity.Property(e => e.EntranceFee)
                .HasDefaultValueSql("((0))")
                .HasColumnType("decimal(9, 2)");
            entity.Property(e => e.Free)
                .IsRequired()
                .HasDefaultValueSql("((1))");
            entity.Property(e => e.StartDate).HasColumnType("datetime");
            entity.Property(e => e.Title).HasMaxLength(100);

            entity.HasOne(d => d.Organizer).WithMany(p => p.Events)
                .HasForeignKey(d => d.OrganizerId)
                .HasConstraintName("FK_EventOrganizer");

            entity.HasOne(d => d.Place).WithMany(p => p.Events)
                .HasForeignKey(d => d.PlaceId)
                .HasConstraintName("FK_EventPlace");
        });

        modelBuilder.Entity<EventPhoto>(entity =>
        {
            entity.ToTable("EventPhoto");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.EventPhoto)
                .HasForeignKey<EventPhoto>(d => d.Id)
                .HasConstraintName("FK_EventPhotoEvent");
        });

        modelBuilder.Entity<EventReview>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.EventId });

            entity.ToTable("EventReview");

            entity.Property(e => e.Description).HasMaxLength(300);

            entity.HasOne(d => d.Event).WithMany(p => p.EventReviews)
                .HasForeignKey(d => d.EventId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EventReview_Event");

            entity.HasOne(d => d.User).WithMany(p => p.EventReviews)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EventReview_User");
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.ToTable("Message");

            entity.Property(e => e.MessageText).HasMaxLength(300);
            entity.Property(e => e.SendingTime)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Chat).WithMany(p => p.Messages)
                .HasForeignKey(d => d.ChatId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MessageChat");

            entity.HasOne(d => d.Sender).WithMany(p => p.Messages)
                .HasForeignKey(d => d.SenderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_MessageMessageSender");
        });

        modelBuilder.Entity<MessageSender>(entity =>
        {
            entity.ToTable("MessageSender");

            entity.HasOne(d => d.Company).WithMany(p => p.MessageSenders)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_MessageSenderCompany");

            entity.HasOne(d => d.User).WithMany(p => p.MessageSenders)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_MessageSenderUser");
        });

        modelBuilder.Entity<Organizer>(entity =>
        {
            entity.ToTable("Organizer");

            entity.Property(e => e.Rating).HasColumnType("decimal(2, 2)");

            entity.HasOne(d => d.Company).WithMany(p => p.Organizers)
                .HasForeignKey(d => d.CompanyId)
                .HasConstraintName("FK_OrganizerCompany");

            entity.HasOne(d => d.User).WithMany(p => p.Organizers)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_OrganizerUser");
        });

        modelBuilder.Entity<Place>(entity =>
        {
            entity.ToTable("Place");

            entity.Property(e => e.Address).HasMaxLength(150);
            entity.Property(e => e.Rating).HasColumnType("decimal(2, 2)");
        });

        modelBuilder.Entity<PlaceReview>(entity =>
        {
            entity.HasKey(e => new { e.OrganizerId, e.PlaceId });

            entity.ToTable("PlaceReview");

            entity.Property(e => e.Description).HasMaxLength(300);

            entity.HasOne(d => d.Organizer).WithMany(p => p.PlaceReviews)
                .HasForeignKey(d => d.OrganizerId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PlaceReview_Organizer");

            entity.HasOne(d => d.Place).WithMany(p => p.PlaceReviews)
                .HasForeignKey(d => d.PlaceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PlaceReview_Place");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__User__3214EC074C34685E");

            entity.ToTable("User");

            entity.Property(e => e.DateOfBirth).HasColumnType("date");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Patronymic).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.RegistrationDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("date");

            entity.HasMany(d => d.Events).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserEvent",
                    r => r.HasOne<Event>().WithMany()
                        .HasForeignKey("EventsId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_UserEvent_Event"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UsersId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_UserEvent_User"),
                    j =>
                    {
                        j.HasKey("UsersId", "EventsId");
                        j.ToTable("UserEvent");
                    });
        });

        modelBuilder.Entity<UserProfilePicture>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__UserProf__3214EC07CDF0039A");

            entity.ToTable("UserProfilePicture");

            entity.Property(e => e.Id).ValueGeneratedNever();

            entity.HasOne(d => d.IdNavigation).WithOne(p => p.UserProfilePicture)
                .HasForeignKey<UserProfilePicture>(d => d.Id)
                .HasConstraintName("FK_ProfilePictureUser");
        });
    }
}

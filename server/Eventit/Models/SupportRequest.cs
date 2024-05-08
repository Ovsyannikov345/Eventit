namespace Eventit.Models
{
    public class SupportRequest
    {
        public int Id { get; set; }

        public string Title { get; set; } = "";

        public string Description { get; set; } = "";

        public DateTime CreationDate { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; } = null!;
    }
}
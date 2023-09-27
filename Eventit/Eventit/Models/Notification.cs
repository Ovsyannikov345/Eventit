namespace Eventit.Models
{
    public class Notification
    {
        public int Id { get; set; }

        public string Title { get; set; } = "";

        public string Description { get; set; } = "";

        public DateTime CreationDate { get; set; }

        public virtual int UserId {  get; set; }

        public virtual User User { get; set; } = null!;
    }
}

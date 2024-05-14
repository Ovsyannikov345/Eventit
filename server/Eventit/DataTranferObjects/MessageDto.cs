using Eventit.DataTranferObjects;
using Eventit.Models;

namespace Server.DataTranferObjects
{
    public class MessageDto
    {
        public int Id { get; set; }

        public string Text { get; set; } = null!;

        public DateTime CreationDate { get; set; }

        public virtual UserDto? User { get; set; } = null!;

        public virtual CompanyDto? Company { get; set; }
    }
}

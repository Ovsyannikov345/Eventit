using Eventit.Models;

namespace Eventit.DataTranferObjects
{
    public class SupportRequestDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;

        public DateTime CreationDate { get; set; }
    }
}

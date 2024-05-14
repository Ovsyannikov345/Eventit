using Eventit.Models;

namespace Eventit.DataTranferObjects
{
    public class SupportRequestPostDto
    {
        public string Title { get; set; } = null!;

        public string Description { get; set; } = null!;
    }
}

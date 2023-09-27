namespace Eventit.DataTranferObjects
{
    public class CompanyContactPersonPostDto
    {
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string? Patronymic { get; set; }

        public string PhoneNumber { get; set; } = null!;

        public string Email { get; set; } = null!;

        public int CompanyId { get; set; }
    }
}

using Server.DataTranferObjects;

namespace Eventit.DataTranferObjects
{
    public class CompanyDto
    {
        public int Id { get; set; }

        public string Email { get; set; } = null!;

        public string Name { get; set; } = null!;

        public DateTime RegistrationDate { get; set; }

        public string RegistrationNumber { get; set; } = null!;

        public CompanyContactPersonDto CompanyContactPerson { get; set; } = null!;

        public int EventsCount { get; set; }
    }
}
using Eventit.DataTranferObjects;
using Eventit.Models;

namespace Server.DataTranferObjects
{
    public class CompanyRegistrationDto
    {
        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string Name { get; set; } = null!;

        public string RegistrationNumber { get; set; } = null!;

        public virtual CompanyContactPersonRegistrationDto CompanyContactPerson { get; set; } = null!;
    }
}

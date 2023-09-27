namespace Eventit.DataTranferObjects
{
    public class CompanyContactPersonPutDto
    {
        public string FirstName { get; set; } = "";

        public string LastName { get; set; } = "";

        public string? Patronymic { get; set; }

        public string PhoneNumber { get; set; } = "";

        public string Email { get; set; } = "";
    }
}

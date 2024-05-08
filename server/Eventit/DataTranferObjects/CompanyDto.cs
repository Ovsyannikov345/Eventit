﻿namespace Eventit.DataTranferObjects
{
    public class CompanyDto
    {
        public string Name { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;

        public string Email { get; set; } = null!;

        public int Password { get; set; }

        public DateTime RegistrationDate { get; set; }

        public bool Verified { get; set; }
    }
}
﻿namespace Eventit.DataTranferObjects
{
    public class UserPostDto
    {
        public string FirstName { get; set; } = null!;

        public string LastName { get; set; } = null!;

        public string? Patronymic { get; set; }

        public string PhoneNumber { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Password { get; set; } = null!;

        public DateTime? DateOfBirth { get; set; }

        public DateTime RegistrationDate { get; set; }
    }
}

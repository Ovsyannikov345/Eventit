using Microsoft.EntityFrameworkCore;

namespace Eventit.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options) : base(options) 
        {
            Database.EnsureCreated();
        }
    }
}

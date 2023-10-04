using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.DataTranferObjects;
using Eventit.Models;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly EventitDbContext _context;

        public CompaniesController(EventitDbContext context)
        {
            _context = context;
        }

        // GET: api/Companies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanyGetDto>>> GetCompanies()
        {
            if (_context.Companies == null)
            {
                return NotFound();
            }

            return await _context.Companies.Select(company => new CompanyGetDto()
            {
                Id = company.Id,
                Name = company.Name,
                PhoneNumber = company.PhoneNumber,
                Email = company.Email,
                Password = company.Password,
                RegistrationDate = company.RegistrationDate,
                Verified = company.Verified,
            }).ToListAsync();
        }

        // GET: api/Companies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyGetDto>> GetCompany(int id)
        {
            if (_context.Companies == null)
            {
                return NotFound();
            }

            var company = await _context.Companies.FindAsync(id);

            if (company == null)
            {
                return NotFound();
            }

            return new CompanyGetDto()
            {
                Id = company.Id,
                Name = company.Name,
                PhoneNumber = company.PhoneNumber,
                Email = company.Email,
                Password = company.Password,
                RegistrationDate = company.RegistrationDate,
                Verified = company.Verified,
            };
        }

        // PUT: api/Companies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompany(int id, CompanyDto request)
        {
            Company? company = await _context.Companies.FirstOrDefaultAsync(comp => comp.Id == id);

            if (company is null)
            {
                return NotFound();
            }

            company.Name = request.Name;
            company.PhoneNumber = request.PhoneNumber;
            company.Email = request.Email;
            company.Password = request.Password;
            company.RegistrationDate = request.RegistrationDate;
            company.Verified = request.Verified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Companies
        [HttpPost]
        public async Task<ActionResult<Company>> PostCompany(CompanyDto request)
        {
            if (_context.Companies == null)
            {
                return Problem("Entity set 'EventitDbContext.Companies'  is null.");
            }

            Company company = new Company()
            {
                Name = request.Name,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                Password = request.Password,
                RegistrationDate = request.RegistrationDate,
                Verified = request.Verified,
            };

            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, company);
        }

        // DELETE: api/Companies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompany(int id)
        {
            if (_context.Companies == null)
            {
                return NotFound();
            }

            var company = await _context.Companies.FindAsync(id);

            if (company == null)
            {
                return NotFound();
            }

            _context.Companies.Remove(company);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
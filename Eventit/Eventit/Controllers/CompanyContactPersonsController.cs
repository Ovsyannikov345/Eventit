using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.DataTranferObjects;
using Eventit.Models;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyContactPersonsController : ControllerBase
    {
        private readonly EventitDbContext _context;

        public CompanyContactPersonsController(EventitDbContext context)
        {
            _context = context;
        }

        // GET: api/CompanyContactPersons
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CompanyContactPersonGetDto>>> GetCompanyContactPeople()
        {
            if (_context.CompanyContactPeople == null)
            {
                return NotFound();
            }

            return await _context.CompanyContactPeople.Select(person => new CompanyContactPersonGetDto()
            {
                Id = person.Id,
                FirstName = person.FirstName,
                LastName = person.LastName,
                Patronymic = person.Patronymic,
                PhoneNumber = person.PhoneNumber,
                Email = person.Email,
            }).ToListAsync();
        }

        // GET: api/CompanyContactPersons/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyContactPersonGetDto>> GetCompanyContactPerson(int id)
        {
            if (_context.CompanyContactPeople == null)
            {
                return NotFound();
            }

            var companyContactPerson = await _context.CompanyContactPeople.FindAsync(id);

            if (companyContactPerson == null)
            {
                return NotFound();
            }

            return new CompanyContactPersonGetDto()
            {
                Id = companyContactPerson.Id,
                FirstName = companyContactPerson.FirstName,
                LastName = companyContactPerson.LastName,
                Patronymic = companyContactPerson.Patronymic,
                PhoneNumber = companyContactPerson.PhoneNumber,
                Email = companyContactPerson.Email,
            };
        }

        // PUT: api/CompanyContactPersons/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompanyContactPerson(int id, CompanyContactPersonPutDto request)
        {
            CompanyContactPerson? person = await _context.CompanyContactPeople.FirstOrDefaultAsync(p => p.Id == id);

            if (person is null)
            {
                return NotFound();
            }

            person.FirstName = request.FirstName;
            person.LastName = request.LastName;
            person.Patronymic = request.Patronymic;
            person.PhoneNumber = request.PhoneNumber;
            person.Email = request.Email;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/CompanyContactPersons
        [HttpPost]
        public async Task<ActionResult<CompanyContactPerson>> PostCompanyContactPerson(CompanyContactPersonPostDto request)
        {
            if (_context.CompanyContactPeople == null)
            {
                return Problem("Entity set 'EventitDbContext.CompanyContactPeople' is null.");
            }

            Company? company = await _context.Companies.FirstOrDefaultAsync(comp => comp.Id == request.CompanyId);

            if (company is null)
            {
                return NotFound();
            }

            _context.CompanyContactPeople.Add(new CompanyContactPerson()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Patronymic = request.Patronymic,
                PhoneNumber = request.PhoneNumber,
                Email = request.Email,
                IdNavigation = company,
            });

            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/CompanyContactPersons/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompanyContactPerson(int id)
        {
            if (_context.CompanyContactPeople == null)
            {
                return NotFound();
            }

            var companyContactPerson = await _context.CompanyContactPeople.FindAsync(id);

            if (companyContactPerson == null)
            {
                return NotFound();
            }

            _context.CompanyContactPeople.Remove(companyContactPerson);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
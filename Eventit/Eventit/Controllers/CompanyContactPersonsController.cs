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
                FirstName = companyContactPerson.FirstName,
                LastName = companyContactPerson.LastName,
                Patronymic = companyContactPerson.Patronymic,
                PhoneNumber = companyContactPerson.PhoneNumber,
                Email = companyContactPerson.Email,
            };
        }

        // PUT: api/CompanyContactPersons/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompanyContactPerson(int id, CompanyContactPerson companyContactPerson)
        {
            // TODO.
            if (id != companyContactPerson.Id)
            {
                return BadRequest();
            }

            _context.Entry(companyContactPerson).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompanyContactPersonExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/CompanyContactPersons
        [HttpPost]
        public async Task<ActionResult<CompanyContactPerson>> PostCompanyContactPerson(CompanyContactPerson companyContactPerson)
        {
            // TODO.
            if (_context.CompanyContactPeople == null)
            {
                return Problem("Entity set 'EventitDbContext.CompanyContactPeople'  is null.");
            }

            _context.CompanyContactPeople.Add(companyContactPerson);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (CompanyContactPersonExists(companyContactPerson.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCompanyContactPerson", new { id = companyContactPerson.Id }, companyContactPerson);
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

        private bool CompanyContactPersonExists(int id)
        {
            return (_context.CompanyContactPeople?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}

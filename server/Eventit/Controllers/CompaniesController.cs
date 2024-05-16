using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.DataTranferObjects;
using Eventit.Models;
using AutoMapper;
using Server.DataTranferObjects;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly EventitDbContext _context;

        private readonly IMapper _mapper;

        public CompaniesController(EventitDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // POST api/Companies/create
        [HttpPost("create")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateCompany(CompanyRegistrationDto companyData)
        {
            bool isEmailFree = await IsEmailFree(companyData.Email);

            if (!isEmailFree)
            {
                return BadRequest("Email is taken");
            }

            Company company = _mapper.Map<Company>(companyData);

            company.Password = BCrypt.Net.BCrypt.HashPassword(companyData.Password);

            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCompany), new { id = company.Id }, _mapper.Map<CompanyDto>(company));
        }

        // GET: api/Companies/profile
        [HttpGet("profile")]
        public async Task<ActionResult<CompanyDto>> GetCompanyProfile()
        {
            if (_context.Companies == null)
            {
                return NotFound();
            }

            string? tokenCompanyId = HttpContext.User.FindFirst("CompanyId")?.Value;

            if (tokenCompanyId == null)
            {
                return Unauthorized();
            }

            if (!int.TryParse(tokenCompanyId, out int companyId))
            {
                return BadRequest();
            }

            var company = await _context.Companies
                .Include(c => c.CompanyContactPerson)
                .FirstOrDefaultAsync(c => c.Id == companyId);

            if (company == null)
            {
                return NotFound();
            }

            var result = _mapper.Map<CompanyDto>(company);

            return Ok(result);
        }

        // GET: api/Companies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CompanyDto>> GetCompany(int id)
        {
            if (_context.Companies == null)
            {
                return NotFound();
            }

            var company = await _context.Companies
                .Include(c => c.CompanyContactPerson)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (company == null)
            {
                return NotFound();
            }

            var result = _mapper.Map<CompanyDto>(company);

            return Ok(result);
        }

        // PUT: api/Companies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompany(int id, CompanyDto updatedCompany)
        {
            Company? company = await _context.Companies
                .Include(c => c.CompanyContactPerson)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (company is null)
            {
                return NotFound();
            }

            string? tokenCompanyId = HttpContext.User.FindFirst("CompanyId")?.Value;

            if (tokenCompanyId == null)
            {
                return Unauthorized();
            }

            if (!int.TryParse(tokenCompanyId, out int companyId) || companyId != updatedCompany.Id)
            {
                return BadRequest();
            }

            if (companyId != company.Id)
            {
                return Forbid();
            }

            _mapper.Map(updatedCompany, company);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET api/Companies/5/reviews
        [HttpGet("{id}/reviews")]
        public async Task<IActionResult> GetCompanyReviews(int id)
        {
            var company = await _context.Companies
                .Include(c => c.Events)
                    .ThenInclude(e => e.EventReviews)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (company is null)
            {
                return NotFound();
            }

            List<EventReviewDto> reviews = new();

            foreach (var e in company.Events)
            {
                foreach (var review in e.EventReviews)
                {
                    reviews.Add(_mapper.Map<EventReviewDto>(review));
                }
            }

            return Ok(reviews);
        }

        // POST api/Companies/check-email
        [HttpPost("check-email")]
        [AllowAnonymous]
        public async Task<IActionResult> CheckEmailAvailability(EmailCheckDto emailData)
        {
            bool isAvailable = await IsEmailFree(emailData.Email);

            return Ok(new
            {
                IsAvailable = isAvailable,
            });
        }

        private async Task<bool> IsEmailFree(string email)
        {
            bool userEmailExists = await _context.Users.AnyAsync(u => u.Email == email);

            if (userEmailExists)
            {
                return false;
            }

            bool companyEmailExists = await _context.Companies.AnyAsync(c => c.Email == email);

            if (companyEmailExists)
            {
                return false;
            }

            return true;
        }
    }
}
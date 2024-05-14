using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.DataTranferObjects;
using Eventit.Models;
using AutoMapper;
using Server.DataTranferObjects;

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
    }
}
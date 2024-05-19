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
    public class SupportRequestsController : ControllerBase
    {
        private readonly EventitDbContext _context;

        private readonly IMapper _mapper;

        public SupportRequestsController(EventitDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/SupportRequests/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSupportRequest(int id)
        {
            if (_context.SupportRequests == null)
            {
                return NotFound();
            }

            var supportRequest = await _context.SupportRequests.FindAsync(id);

            if (supportRequest == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<SupportRequestDto>(supportRequest));
        }

        // POST: api/SupportRequests
        [HttpPost]
        public async Task<IActionResult> PostSupportRequest(SupportRequestPostDto supportRequestData)
        {
            if (_context.SupportRequests == null)
            {
                return Problem("Entity set 'EventitDbContext.SupportRequests'  is null.");
            }

            string? tokenCompanyId = HttpContext.User.FindFirst("CompanyId")?.Value;

            string? tokenUserId = HttpContext.User.FindFirst("UserId")?.Value;

            if (tokenCompanyId == null && tokenUserId == null)
            {
                return Unauthorized();
            }

            SupportRequest supportRequest = _mapper.Map<SupportRequest>(supportRequestData);

            if (!int.TryParse(tokenCompanyId, out int companyId))
            {
                if (!int.TryParse(tokenUserId, out int userId))
                {
                    return BadRequest();
                }

                supportRequest.UserId = userId;
            }
            else
            {
                supportRequest.CompanyId = companyId;
            }

            _context.SupportRequests.Add(supportRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSupportRequest), new { id = supportRequest.Id }, supportRequest);
        }
    }
}
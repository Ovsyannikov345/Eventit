using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.DataTranferObjects;
using Eventit.Models;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupportRequestsController : ControllerBase
    {
        private readonly EventitDbContext _context;

        public SupportRequestsController(EventitDbContext context)
        {
            _context = context;
        }

        // GET: api/SupportRequests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupportRequestGetDto>>> GetSupportRequests()
        {
            if (_context.SupportRequests == null)
            {
                return NotFound();
            }

            return await _context.SupportRequests.Select(req => new SupportRequestGetDto()
            {
                Id = req.Id,
                Title = req.Title,
                Description = req.Description,
                CreationDate = req.CreationDate,
                UserId = req.UserId,
            }).ToListAsync();
        }

        // GET: api/SupportRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SupportRequestGetDto>> GetSupportRequest(int id)
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

            return new SupportRequestGetDto()
            {
                Id = supportRequest.Id,
                Title = supportRequest.Title,
                Description = supportRequest.Description,
                CreationDate = supportRequest.CreationDate,
                UserId = supportRequest.UserId,
            };
        }

        // PUT: api/SupportRequests/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupportRequest(int id, SupportRequestDto request)
        {
            SupportRequest supportRequest = await _context.SupportRequests.FirstOrDefaultAsync(req => req.Id == id);

            if (supportRequest is null)
            {
                return NotFound();
            }

            supportRequest.Title = request.Title;
            supportRequest.Description = request.Description;
            supportRequest.CreationDate = request.CreationDate;
            supportRequest.UserId = request.UserId;

            return NoContent();
        }

        // POST: api/SupportRequests
        [HttpPost]
        public async Task<ActionResult<SupportRequest>> PostSupportRequest(SupportRequestDto request)
        {
            if (_context.SupportRequests == null)
            {
                return Problem("Entity set 'EventitDbContext.SupportRequests'  is null.");
            }

            SupportRequest supportRequest = new SupportRequest()
            {
                Title = request.Title,
                Description = request.Description,
                CreationDate = request.CreationDate,
                UserId = request.UserId,
            };

            _context.SupportRequests.Add(supportRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSupportRequest), new { id = supportRequest.Id }, supportRequest);
        }

        // DELETE: api/SupportRequests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupportRequest(int id)
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

            _context.SupportRequests.Remove(supportRequest);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
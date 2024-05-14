using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.Models;
using Server.DataTranferObjects;
using AutoMapper;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventReviewsController : ControllerBase
    {
        private readonly EventitDbContext _context;

        private readonly IMapper _mapper;

        public EventReviewsController(EventitDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/EventReviews/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventReview(int id)
        {
            if (_context.EventReviews == null)
            {
                return NotFound();
            }

            var eventReview = await _context.EventReviews.FirstOrDefaultAsync(r => r.Id == id);

            if (eventReview == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<EventReviewDto>(eventReview));
        }

        // POST: api/EventReviews
        [HttpPost]
        public async Task<ActionResult<EventReview>> PostEventReview(EventReviewPostDto eventReviewData)
        {
            if (_context.EventReviews == null)
            {
                return Problem("Entity set 'EventitDbContext.EventReviews' is null.");
            }

            string? tokenUserId = HttpContext.User.FindFirst("UserId")?.Value;

            if (tokenUserId == null)
            {
                return Unauthorized();
            }


            if (!int.TryParse(tokenUserId, out int userId))
            {
                return BadRequest();
            }

            EventReview eventReview = _mapper.Map<EventReview>(eventReviewData);

            if (_context.EventReviews.Any(r => r.EventId == eventReview.EventId && r.UserId == userId))
            { 
                return BadRequest("Review already exists");
            }

            eventReview.UserId = userId;

            _context.EventReviews.Add(eventReview);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EventReviewExists(eventReview.UserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEventReview", new { id = eventReview.UserId }, eventReview);
        }

        private bool EventReviewExists(int id)
        {
            return (_context.EventReviews?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}

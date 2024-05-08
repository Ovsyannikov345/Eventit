using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.Models;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventReviewsController : ControllerBase
    {
        private readonly EventitDbContext _context;

        public EventReviewsController(EventitDbContext context)
        {
            _context = context;
        }

        // GET: api/EventReviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventReview>>> GetEventReviews()
        {
          if (_context.EventReviews == null)
          {
              return NotFound();
          }
            return await _context.EventReviews.ToListAsync();
        }

        // GET: api/EventReviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EventReview>> GetEventReview(int id)
        {
          if (_context.EventReviews == null)
          {
              return NotFound();
          }
            var eventReview = await _context.EventReviews.FindAsync(id);

            if (eventReview == null)
            {
                return NotFound();
            }

            return eventReview;
        }

        // PUT: api/EventReviews/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEventReview(int id, EventReview eventReview)
        {
            if (id != eventReview.UserId)
            {
                return BadRequest();
            }

            _context.Entry(eventReview).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventReviewExists(id))
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

        // POST: api/EventReviews
        [HttpPost]
        public async Task<ActionResult<EventReview>> PostEventReview(EventReview eventReview)
        {
          if (_context.EventReviews == null)
          {
              return Problem("Entity set 'EventitDbContext.EventReviews'  is null.");
          }
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

        // DELETE: api/EventReviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEventReview(int id)
        {
            if (_context.EventReviews == null)
            {
                return NotFound();
            }
            var eventReview = await _context.EventReviews.FindAsync(id);
            if (eventReview == null)
            {
                return NotFound();
            }

            _context.EventReviews.Remove(eventReview);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventReviewExists(int id)
        {
            return (_context.EventReviews?.Any(e => e.UserId == id)).GetValueOrDefault();
        }
    }
}

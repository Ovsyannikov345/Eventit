using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.DataTranferObjects;
using Eventit.Models;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlaceReviewsController : ControllerBase
    {
        private readonly EventitDbContext _context;

        public PlaceReviewsController(EventitDbContext context)
        {
            _context = context;
        }

        // GET: api/PlaceReviews
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlaceReviewGetDto>>> GetPlaceReviews()
        {
            if (_context.PlaceReviews == null)
            {
                return NotFound();
            }

            return await _context.PlaceReviews.Select(review => new PlaceReviewGetDto()
            {
                OrganizerId = review.OrganizerId,
                PlaceId = review.PlaceId,
                Description = review.Description,
                Grade = review.Grade,
            }).ToListAsync();
        }

        // GET: api/PlaceReviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlaceReviewGetDto>> GetPlaceReview(int id)
        {
            if (_context.PlaceReviews == null)
            {
                return NotFound();
            }

            var placeReview = await _context.PlaceReviews.FindAsync(id);

            if (placeReview == null)
            {
                return NotFound();
            }

            return new PlaceReviewGetDto()
            {
                OrganizerId = placeReview.OrganizerId,
                PlaceId = placeReview.PlaceId,
                Description = placeReview.Description,
                Grade = placeReview.Grade,
            };
        }

        // PUT: api/PlaceReviews
        [HttpPut("")]
        public async Task<IActionResult> PutPlaceReview(PlaceReviewDto request)
        {
            PlaceReview? placeReview = await _context.PlaceReviews.FirstOrDefaultAsync(rev => 
                rev.OrganizerId == request.OrganizerId && rev.PlaceId == request.PlaceId);

            if (placeReview is null)
            {
                return NotFound();
            }

            placeReview.OrganizerId = request.OrganizerId;
            placeReview.PlaceId = request.PlaceId;
            placeReview.Description = request.Description;
            placeReview.Grade = request.Grade;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/PlaceReviews
        [HttpPost]
        public async Task<ActionResult<PlaceReview>> PostPlaceReview(PlaceReviewDto request)
        {
            if (_context.PlaceReviews == null)
            {
                return Problem("Entity set 'EventitDbContext.PlaceReviews'  is null.");
            }

            PlaceReview placeReview = new PlaceReview()
            {
                OrganizerId = request.OrganizerId,
                PlaceId = request.PlaceId,
                Description = request.Description,
                Grade = request.Grade,
            };

            _context.PlaceReviews.Add(placeReview);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlaceReview", new { id = placeReview.OrganizerId }, placeReview);
        }

        // DELETE: api/PlaceReviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlaceReview(int id)
        {
            if (_context.PlaceReviews == null)
            {
                return NotFound();
            }

            var placeReview = await _context.PlaceReviews.FindAsync(id);

            if (placeReview == null)
            {
                return NotFound();
            }

            _context.PlaceReviews.Remove(placeReview);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
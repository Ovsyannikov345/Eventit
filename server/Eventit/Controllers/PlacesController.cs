using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.DataTranferObjects;
using Eventit.Models;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        private readonly EventitDbContext _context;

        public PlacesController(EventitDbContext context)
        {
            _context = context;
        }

        // GET: api/Places
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlaceGetDto>>> GetPlaces()
        {
            if (_context.Places == null)
            {
                return NotFound();
            }

            return await _context.Places.Select(place => new PlaceGetDto()
            {
                Id = place.Id,
                Address = place.Address,
                Rating = place.Rating,
                ReviewsCount = place.ReviewsCount,
            }).ToListAsync();
        }

        // GET: api/Places/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlaceGetDto>> GetPlace(int id)
        {
            if (_context.Places == null)
            {
                return NotFound();
            }

            var place = await _context.Places.FindAsync(id);

            if (place == null)
            {
                return NotFound();
            }

            return new PlaceGetDto()
            {
                Id = place.Id,
                Address = place.Address,
                Rating = place.Rating,
                ReviewsCount = place.ReviewsCount,
            };
        }

        // PUT: api/Places/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlace(int id, PlaceDto request)
        {
            Place? place = await _context.Places.FirstOrDefaultAsync(place => place.Id == id);

            if (place is null)
            {
                return NotFound();
            }

            place.Address = request.Address;
            place.Rating = request.Rating;
            place.ReviewsCount = request.ReviewsCount;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Places
        [HttpPost]
        public async Task<ActionResult<Place>> PostPlace(PlaceDto request)
        {
            if (_context.Places == null)
            {
                return Problem("Entity set 'EventitDbContext.Places'  is null.");
            }

            Place place = new Place()
            {
                Address = request.Address,
                Rating = request.Rating,
                ReviewsCount = request.ReviewsCount,
            };

            _context.Places.Add(place);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPlace), new { id = place.Id }, place);
        }

        // DELETE: api/Places/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlace(int id)
        {
            if (_context.Places == null)
            {
                return NotFound();
            }

            var place = await _context.Places.FindAsync(id);

            if (place == null)
            {
                return NotFound();
            }

            _context.Places.Remove(place);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
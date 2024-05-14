using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.DataTranferObjects;
using Eventit.Models;
using AutoMapper;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        private readonly EventitDbContext _context;

        private readonly IMapper _mapper;

        public PlacesController(EventitDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Places
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlacePostDto>>> GetPlaces()
        {
            if (_context.Places == null)
            {
                return NotFound();
            }

            List<Place> places = await _context.Places
                .Include(p => p.PlaceReviews)
                .ToListAsync();

            List<PlaceDto> mappedPlaces = new List<PlaceDto>();

            foreach (Place place in places)
            {
                mappedPlaces.Add(_mapper.Map<PlaceDto>(place));
            }

            return Ok(mappedPlaces);
        }

        // GET: api/Places/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlace(int id)
        {
            if (_context.Places == null)
            {
                return NotFound();
            }

            var place = await _context.Places.FirstOrDefaultAsync(p => p.Id == id);

            if (place == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<PlaceDto>(place));
        }

        // POST: api/Places
        [HttpPost]
        public async Task<IActionResult> PostPlace(PlacePostDto placeData)
        {
            if (_context.Places == null)
            {
                return Problem("Entity set 'EventitDbContext.Places'  is null.");
            }

            Place place = _mapper.Map<Place>(placeData);

            _context.Places.Add(place);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPlace), new { id = place.Id }, place);
        }
    }
}
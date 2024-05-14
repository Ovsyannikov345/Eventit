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
    public class PlaceReviewsController : ControllerBase
    {
        private readonly EventitDbContext _context;

        private readonly IMapper _mapper;

        public PlaceReviewsController(EventitDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/PlaceReviews/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPlaceReview(int id)
        {
            if (_context.PlaceReviews == null)
            {
                return NotFound();
            }

            var placeReview = await _context.PlaceReviews.FirstOrDefaultAsync(r => r.Id == id);

            if (placeReview == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<PlaceReviewDto>(placeReview));
        }

        // POST: api/PlaceReviews
        [HttpPost]
        public async Task<IActionResult> PostPlaceReview(PlaceReviewPostDto placeReviewData)
        {
            if (_context.PlaceReviews == null)
            {
                return Problem("Entity set 'EventitDbContext.PlaceReviews'  is null.");
            }

            // TODO get id from auth.
            PlaceReview placeReview = _mapper.Map<PlaceReview>(placeReviewData);

            _context.PlaceReviews.Add(placeReview);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPlaceReview", new { id = placeReview.Id }, placeReview);
        }
    }
}
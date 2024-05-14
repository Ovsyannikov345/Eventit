using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.Models;
using Eventit.DataTranferObjects;
using AutoMapper;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly EventitDbContext _context;

        private readonly IMapper _mapper;

        public UsersController(EventitDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            if (_context.Users == null)
            {
                return NotFound();
            }

            User? user = await _context.Users
                .Include(u => u.Events)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<UserDto>(user));
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, UserPutDto updatedUser)
        {
            User? user = await _context.Users.FirstOrDefaultAsync(user => user.Id == id);

            if (user is null)
            {
                return BadRequest();
            }

            _mapper.Map(updatedUser, user);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
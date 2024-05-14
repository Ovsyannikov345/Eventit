using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.Models;
using Eventit.DataTranferObjects;
using AutoMapper;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

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

        // POST api/Users/create
        [HttpPost("create")]
        public async Task<IActionResult> CreateUser()
        {
            // TODO implement.
            throw new NotImplementedException();
        }

        // GET: api/Users/profile
        [HttpGet("profile")]
        public async Task<ActionResult<UserDto>> GetCompanyProfile()
        {
            if (_context.Users == null)
            {
                return NotFound();
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

            var user = await _context.Users
                .Include(u => u.Events)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound();
            }

            var result = _mapper.Map<UserDto>(user);

            return Ok(result);
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
                return NotFound();
            }

            string? tokenUserId = HttpContext.User.FindFirst("UserId")?.Value;

            if (tokenUserId == null)
            {
                return Unauthorized();
            }

            if (!int.TryParse(tokenUserId, out int userId) || userId != updatedUser.Id)
            {
                return BadRequest();
            }

            if (userId != user.Id)
            {
                return Forbid();
            }

            _mapper.Map(updatedUser, user);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
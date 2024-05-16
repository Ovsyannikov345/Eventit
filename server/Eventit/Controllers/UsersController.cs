using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.Models;
using Eventit.DataTranferObjects;
using AutoMapper;
using Server.DataTranferObjects;
using Microsoft.AspNetCore.Authorization;

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
        [AllowAnonymous]
        public async Task<IActionResult> CreateUser(UserRegistrationDto userData)
        {
            bool isEmailFree = await IsEmailFree(userData.Email);

            if (!isEmailFree)
            {
                return BadRequest("Email is taken");
            }

            User user = _mapper.Map<User>(userData);

            user.Password = BCrypt.Net.BCrypt.HashPassword(userData.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, _mapper.Map<UserDto>(user));
        }

        // GET: api/Users/profile
        [HttpGet("profile")]
        public async Task<ActionResult<UserDto>> GetUserProfile()
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

        // POST api/Users/check-email
        [HttpPost("check-email")]
        [AllowAnonymous]
        public async Task<IActionResult> CheckEmailAvailability(EmailCheckDto emailData)
        {
            bool isAvailable = await IsEmailFree(emailData.Email);

            return Ok(new
            {
                IsAvailable = isAvailable,
            });
        }

        private async Task<bool> IsEmailFree(string email)
        {
            bool userEmailExists = await _context.Users.AnyAsync(u => u.Email == email);

            if (userEmailExists)
            {
                return false;
            }

            bool companyEmailExists = await _context.Companies.AnyAsync(c => c.Email == email);

            if (companyEmailExists)
            {
                return false;
            }

            return true;
        }
    }
}
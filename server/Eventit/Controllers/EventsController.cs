using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.Models;
using AutoMapper;
using Server.DataTranferObjects;
using Eventit.DataTranferObjects;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly EventitDbContext _context;

        private readonly IMapper _mapper;

        public EventsController(EventitDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventDto>>> GetEvents()
        {
            if (_context.Events == null)
            {
                return NotFound();
            }

            var events = await _context.Events
                .Include(e => e.Company)
                .Include(e => e.Place)
                .ToListAsync();

            var mappedEvents = events.Select(_mapper.Map<EventDto>).ToList();

            return Ok(mappedEvents);
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EventDto>> GetEvent(int id)
        {
            if (_context.Events == null)
            {
                return NotFound();
            }

            var @event = await _context.Events
                .Include(e => e.Company)
                    .ThenInclude(c => c.CompanyContactPerson)
                .Include(e => e.Place)
                    .ThenInclude(p => p!.PlaceReviews)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (@event == null)
            {
                return NotFound();
            }

            return _mapper.Map<EventDto>(@event);
        }

        // POST: api/Events
        [HttpPost]
        public async Task<IActionResult> PostEvent(EventPostDto eventData)
        {
            if (_context.Events == null)
            {
                return Problem("Entity set 'EventitDbContext.Events'  is null.");
            }

            string? tokenCompanyId = HttpContext.User.FindFirst("CompanyId")?.Value;

            if (tokenCompanyId == null)
            {
                return Unauthorized();
            }

            if (!int.TryParse(tokenCompanyId, out int companyId))
            {
                return BadRequest();
            }

            Event @event = _mapper.Map<Event>(eventData);

            @event.CompanyId = companyId;

            _context.Events.Add(@event);
            await _context.SaveChangesAsync();

            Chat chat = new()
            {
                IsPublic = true,
                EventId = @event.Id,
            };

            _context.Chats.Add(chat);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // GET: api/Events/5/chat
        [HttpGet("{id}/chat")]
        public async Task<IActionResult> GetEventChat(int id)
        {
            if (_context.Chats == null)
            {
                return NotFound();
            }

            Chat? chat = await _context.Chats
                .Include(c => c.Messages)
                    .ThenInclude(m => m.User)
                .Include(c => c.Messages)
                    .ThenInclude(m => m.Company)
                .FirstOrDefaultAsync(c => c.EventId == id);

            if (chat == null)
            {
                return NotFound();
            }

            var result = _mapper.Map<ChatDto>(chat);

            string? tokenCompanyId = HttpContext.User.FindFirst("CompanyId")?.Value;

            if (tokenCompanyId != null && int.TryParse(tokenCompanyId, out _))
            {
                return Ok(result);
            }

            string? tokenUserId = HttpContext.User.FindFirst("UserId")?.Value;

            if (tokenUserId == null || !int.TryParse(tokenUserId, out int userId))
            {
                return Unauthorized();
            }

            User? user = await _context.Users
                .Include(u => u.Events)
                    .ThenInclude(e => e.Chat)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return BadRequest();
            }

            if (!user.Events.Any(e => e.Chat?.Id == chat.Id))
            {
                return Forbid();
            }

            return Ok(result);
        }

        // GET: api/Events/5/participants
        [HttpGet("{id}/participants")]
        public async Task<IActionResult> GetEventParticipants(int id)
        {
            Event? @event = await _context.Events
                .Include(e => e.Users)
                .SingleOrDefaultAsync(e => e.Id == id);

            if (@event == null)
            {
                return Ok(new List<Event>());
            }

            return Ok(_mapper.Map<ICollection<UserDto>>(@event.Users));
        }

        // POST: api/Events/5/join
        [HttpPost("{id}/join")]
        public async Task<IActionResult> JoinEvent(int id)
        {
            string? tokenUserId = HttpContext.User.FindFirst("UserId")?.Value;

            if (tokenUserId == null)
            {
                return Unauthorized();
            }

            if (!int.TryParse(tokenUserId, out int userId))
            {
                return BadRequest();
            }

            Event? @event = await _context.Events
                .Include(e => e.Users)
                .SingleOrDefaultAsync(e => e.Id == id);

            if (@event == null)
            {
                return NotFound();
            }

            if (@event.IsFinished)
            {
                return BadRequest("Event is finished");
            }

            if (@event.Users.Any(u => u.Id == userId))
            {
                return BadRequest("Already joined");
            }

            User? user = await _context.Users.SingleOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                return NotFound();
            }

            @event.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<ICollection<UserDto>>(@event.Users));
        }

        // POST: api/Events/5/leave
        [HttpPost("{id}/leave")]
        public async Task<IActionResult> LeaveEvent(int id)
        {
            string? tokenUserId = HttpContext.User.FindFirst("UserId")?.Value;

            if (tokenUserId == null)
            {
                return Unauthorized();
            }

            if (!int.TryParse(tokenUserId, out int userId))
            {
                return BadRequest();
            }

            Event? @event = await _context.Events
                .Include(e => e.Users)
                .SingleOrDefaultAsync(e => e.Id == id);

            if (@event == null)
            {
                return NotFound();
            }

            if (!@event.Users.Any(u => u.Id == userId))
            {
                return BadRequest("You are not participant");
            }

            User? user = @event.Users.SingleOrDefault(u => u.Id == userId);

            if (user == null)
            {
                return NotFound();
            }

            @event.Users.Remove(user);
            await _context.SaveChangesAsync();

            return Ok(_mapper.Map<ICollection<UserDto>>(@event.Users));
        }

        // POST: api/Events/5/finish
        [HttpPost("{id}/finish")]
        public async Task<IActionResult> FinishEvent(int id)
        {
            string? tokenCompanyId = HttpContext.User.FindFirst("CompanyId")?.Value;

            if (tokenCompanyId == null)
            {
                return Unauthorized();
            }

            if (!int.TryParse(tokenCompanyId, out int companyId))
            {
                return BadRequest();
            }

            Event? @event = await _context.Events.SingleOrDefaultAsync(e => e.Id == id);

            if (@event == null)
            {
                return NotFound();
            }

            if (@event.IsFinished)
            {
                return BadRequest("Event is already finished");
            }

            @event.IsFinished = true;
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}

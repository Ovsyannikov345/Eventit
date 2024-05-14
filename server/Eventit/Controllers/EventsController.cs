using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.Models;
using AutoMapper;
using Server.DataTranferObjects;

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
                .Include(e => e.Place)
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

            // TODO get company id from auth.
            Event @event = _mapper.Map<Event>(eventData);

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

            return Ok(_mapper.Map<ChatDto>(chat));
        }

        // POST: api/Events/5/join
        [HttpPost("{id}/join")]
        public async Task<IActionResult> JoinEvent(int id)
        {
            // TODO read id from auth
            // TODO implement
            throw new NotImplementedException();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.Models;
using Eventit.DataTranferObjects;
using AutoMapper;
using Server.DataTranferObjects;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly EventitDbContext _context;

        private readonly IMapper _mapper;

        public NotificationsController(EventitDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Notifications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotificationDto>>> GetNotifications()
        {
            if (_context.Notifications == null)
            {
                return NotFound();
            }

            // TODO get id`s from auth.

            // TODO implement.
            throw new NotImplementedException();
        }

        // GET: api/Notifications/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NotificationDto>> GetNotification(int id)
        {
            if (_context.Notifications == null)
            {
                return NotFound();
            }

            var notification = await _context.Notifications.FirstOrDefaultAsync(n => n.Id == id);

            if (notification == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<NotificationDto>(notification));
        }

        // POST: api/Notifications
        [HttpPost]
        public async Task<IActionResult> PostNotification(NotificationPostDto notificationData)
        {
            if (_context.Notifications == null)
            {
                return Problem("Entity set 'EventitDbContext.Notifications'  is null.");
            }

            // TODO get id`s from auth.
            Notification notification = _mapper.Map<Notification>(notificationData);

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNotification), new { id = notification.Id }, notification);
        }

        // POST: api/Notifications/read
        [HttpPost("read")]
        public async Task<IActionResult> ReadAll()
        {
            // TODO get id`s from auth.
            // TODO implement.
            throw new NotImplementedException();
        }

        // POST: api/Notifications/5/read
        [HttpPost("{id}/read")]
        public async Task<IActionResult> ReadAll(int id)
        {
            // TODO get id`s from auth and check privillege.
            
            Notification? notification = await _context.Notifications.FirstOrDefaultAsync(n => n.Id == id);

            if (notification is null)
            {
                return NotFound();
            }

            notification.IsRead = true;
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
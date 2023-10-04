using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eventit.Data;
using Eventit.Models;
using Eventit.DataTranferObjects;

namespace Eventit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly EventitDbContext _context;

        public NotificationsController(EventitDbContext context)
        {
            _context = context;
        }

        // GET: api/Notifications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotificationGetDto>>> GetNotifications()
        {
            if (_context.Notifications == null)
            {
                return NotFound();
            }

            return await _context.Notifications.Select(notification => new NotificationGetDto()
            {
                Id = notification.Id,
                Title = notification.Title,
                Description = notification.Description,
                CreationDate = notification.CreationDate,
            }).ToListAsync();
        }

        // GET: api/Notifications/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NotificationGetDto>> GetNotification(int id)
        {
            if (_context.Notifications == null)
            {
                return NotFound();
            }

            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null)
            {
                return NotFound();
            }

            return new NotificationGetDto()
            {
                Id = notification.Id,
                Title = notification.Title,
                Description = notification.Description,
                CreationDate = notification.CreationDate,
            };
        }

        // PUT: api/Notifications/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNotification(NotificationDto request)
        {
            Notification? notification = await _context.Notifications.FirstOrDefaultAsync(notif => notif.Id == id);

            if (notification == null)
            {
                return NotFound();
            }

            notification.Title = request.Title;
            notification.Description = request.Description;
            notification.CreationDate = request.CreationDate;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // POST: api/Notifications
        [HttpPost]
        public async Task<ActionResult<Notification>> PostNotification(NotificationDto request)
        {
            if (_context.Notifications == null)
            {
                return Problem("Entity set 'EventitDbContext.Notifications'  is null.");
            }

            Notification notification = new Notification()
            {
                Title = request.Title,
                Description = request.Description,
                CreationDate = request.CreationDate,
            };

            _context.Notifications.Add(notification);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNotification), new { id = notification.Id }, notification);
        }

        // DELETE: api/Notifications/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotification(int id)
        {
            if (_context.Notifications == null)
            {
                return NotFound();
            }

            var notification = await _context.Notifications.FindAsync(id);

            if (notification == null)
            {
                return NotFound();
            }

            _context.Notifications.Remove(notification);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
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
                return Ok(new List<NotificationDto>());
            }

            string? tokenCompanyId = HttpContext.User.FindFirst("CompanyId")?.Value;

            string? tokenUserId = HttpContext.User.FindFirst("UserId")?.Value;

            if (tokenCompanyId == null && tokenUserId == null)
            {
                return Unauthorized();
            }

            if (int.TryParse(tokenCompanyId, out int companyId))
            {
                var notifications = await _context.Notifications.Where(n => n.CompanyId == companyId && n.ShowFrom <= DateTime.Now).ToListAsync();

                return Ok(_mapper.Map<IEnumerable<NotificationDto>>(notifications));
            }

            if (int.TryParse(tokenUserId, out int userId))
            {
                var notifications = await _context.Notifications.Where(n => n.UserId == userId && n.ShowFrom <= DateTime.Now).ToListAsync();

                return Ok(_mapper.Map<IEnumerable<NotificationDto>>(notifications));
            }

            return BadRequest();
        }

        // POST: api/Notifications/read
        [HttpPost("read")]
        public async Task<IActionResult> ReadAll()
        {
            string? tokenCompanyId = HttpContext.User.FindFirst("CompanyId")?.Value;

            string? tokenUserId = HttpContext.User.FindFirst("UserId")?.Value;

            if (tokenCompanyId == null && tokenUserId == null)
            {
                return Unauthorized();
            }

            if (int.TryParse(tokenCompanyId, out int companyId))
            {
                var notifications = await _context.Notifications.Where(n => n.CompanyId == companyId && !n.IsRead).ToListAsync();

                foreach (var notification in notifications)
                {
                    notification.IsRead = true;
                }

                await _context.SaveChangesAsync();

                return Ok();
            }

            if (int.TryParse(tokenUserId, out int userId))
            {
                var notifications = await _context.Notifications.Where(n => n.UserId == userId && !n.IsRead).ToListAsync();

                foreach (var notification in notifications)
                {
                    notification.IsRead = true;
                }

                await _context.SaveChangesAsync();

                return Ok();
            }

            return BadRequest();
        }

        // POST: api/Notifications/5/read
        [HttpPost("{id}/read")]
        public async Task<IActionResult> ReadOne(int id)
        {
            string? tokenCompanyId = HttpContext.User.FindFirst("CompanyId")?.Value;

            string? tokenUserId = HttpContext.User.FindFirst("UserId")?.Value;

            if (tokenCompanyId == null && tokenUserId == null)
            {
                return Unauthorized();
            }

            Notification? notification = await _context.Notifications.FirstOrDefaultAsync(n => n.Id == id);

            if (notification is null)
            {
                return NotFound();
            }

            if (int.TryParse(tokenCompanyId, out int companyId))
            {
                if (notification.CompanyId != companyId)
                {
                    return Forbid();
                }

                notification.IsRead = true;
                await _context.SaveChangesAsync();

                return Ok();
            }

            if (int.TryParse(tokenUserId, out int userId))
            {
                if (notification.UserId != userId)
                {
                    return Forbid();
                }

                notification.IsRead = true;
                await _context.SaveChangesAsync();

                return Ok();
            }

            return BadRequest();
        }
    }
}
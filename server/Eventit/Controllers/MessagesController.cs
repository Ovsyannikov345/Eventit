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
    public class MessagesController : ControllerBase
    {
        private readonly EventitDbContext _context;

        private readonly IMapper _mapper;

        public MessagesController(EventitDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // POST: api/Messages
        [HttpPost]
        public async Task<IActionResult> PostMessage(MessagePostDto messageData)
        {
            if (_context.Messages == null)
            {
                return Problem("Entity set 'EventitDbContext.Messages'  is null.");
            }

            string? tokenCompanyId = HttpContext.User.FindFirst("CompanyId")?.Value;

            string? tokenUserId = HttpContext.User.FindFirst("UserId")?.Value;

            if (tokenCompanyId == null && tokenUserId == null)
            {
                return Unauthorized();
            }

            Message message = _mapper.Map<Message>(messageData);

            if (!int.TryParse(tokenCompanyId, out int companyId))
            {
                if (!int.TryParse(tokenUserId, out int userId))
                {
                    return BadRequest();
                }

                message.UserId = userId;
            }
            else 
            {
                message.CompanyId = companyId;
            }

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}

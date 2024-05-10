using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.DatabaseContext;
using back_end.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using back_end.DTO;
using back_end.Enums;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Identity;
using back_end.Domain.Identity;
//using back_end.DatabaseContext.Hub;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AdminRequestsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly UserManager<ApplicationUser> _usermanager;

        //private readonly IHubContext<NotificationHub> _hubContext;


        public AdminRequestsController(ApplicationDbContext context, /*IHubContext<NotificationHub> hubContext*/UserManager<ApplicationUser> usermanager)
        {
            _context = context;
            //_hubContext = hubContext;
           _usermanager = usermanager;
        }

        // GET: api/AdminRequests
        [HttpGet]
        public async Task<ActionResult<List<AdminRequestResponse>>> GetAdminRequests()
        {
            var adminRequests = await _context.AdminRequests.Include(r => r.User).ToListAsync();

            if (_context.AdminRequests == null)
          {
              return NotFound();
          }
            if (adminRequests == null || !adminRequests.Any())
            {
                return NotFound();
            }

            List<AdminRequestResponse> Adminrequest = new List<AdminRequestResponse>();

            foreach (var adminRequest in adminRequests)
            {
                ApplicationUser User =await _usermanager.FindByIdAsync(adminRequest.Id.ToString());

                var response = new AdminRequestResponse
                {
                    RequestTypeName = adminRequest.RequestTypeName.ToString(),
                    User= User,
                    Email=User.Email,
                    RequestDate = adminRequest.RequestDate,
                    Status = adminRequest.Status.ToString()
                };
                Adminrequest.Add(response);
            }
            return Adminrequest;
        }

        [HttpGet("NewConnection")]
        public async Task<ActionResult<List<AdminRequestResponse>>> GetNewConnectionRequests()
        {
            var newConnectionRequests = await _context.AdminRequests
                .Include(r => r.User)
                .Where(r => r.RequestTypeName == RequestType.NewConnection)
                .ToListAsync();
            

            if (newConnectionRequests == null || !newConnectionRequests.Any())
            {
                return NotFound();
            }

            List<AdminRequestResponse> adminRequestResponses = new List<AdminRequestResponse>();

            foreach (var adminRequest in newConnectionRequests)
            {
                ApplicationUser user = await _usermanager.FindByIdAsync(adminRequest.Id.ToString());
               

                if (user != null)
                {
                    var response = new AdminRequestResponse
                    {
                        RequestTypeName = adminRequest.RequestTypeName.ToString(),
                        User = user,
                        Email = user.Email,
                        Name=user.Name,
                        RequestDate = adminRequest.RequestDate,
                        Status = adminRequest.Status.ToString(),
                        Remarks=adminRequest.Remark
                    };
                    adminRequestResponses.Add(response);
                }
            }
            return adminRequestResponses;
        }

        // GET: api/AdminRequests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AdminRequest>> GetAdminRequest(Guid id)
        {
          if (_context.AdminRequests == null)
          {
              return NotFound();
          }
            var adminRequest = await _context.AdminRequests.FindAsync(id);

            if (adminRequest == null)
            {
                return NotFound();
            }

            return adminRequest;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAdminRequest(Guid id, AdminRequest adminRequest)
        {
            if (id != adminRequest.RequestId)
            {
                return BadRequest();
            }

            _context.Entry(adminRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AdminRequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AdminRequests
        [HttpPost]
        public async Task<ActionResult<AdminRequest>> PostAdminRequest([FromBody]AdminRequestDTO adminRequestdto)
         {
            if (_context.AdminRequests == null)
            {
                return Problem("Entity set 'ApplicationDbContext.AdminRequests'  is null.");
            }

            if (!Enum.TryParse<RequestType>(adminRequestdto.RequestTypeName, out var requestType))
            {
                return BadRequest("Invalid request type.");
            }

            var adminRequest = new AdminRequest()
            {
                Description = adminRequestdto.Description,
                Id = adminRequestdto.Id,
                RequestTypeName = requestType,
            };
            _context.AdminRequests.Add(adminRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAdminRequest", new { id = adminRequest.RequestId }, adminRequest);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAdminRequest(Guid id)
        {
            if (_context.AdminRequests == null)
            {
                return NotFound();
            }
            var adminRequest = await _context.AdminRequests.FindAsync(id);
            if (adminRequest == null)
            {
                return NotFound();
            }

            _context.AdminRequests.Remove(adminRequest);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AdminRequestExists(Guid id)
        {
            return (_context.AdminRequests?.Any(e => e.RequestId == id)).GetValueOrDefault();
        }
    }
}

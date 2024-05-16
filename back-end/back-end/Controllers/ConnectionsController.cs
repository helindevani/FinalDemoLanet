using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.DTO;
using back_end.Enums;
using Microsoft.CodeAnalysis;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Authorization;
using back_end.Domain.Identity;
using Microsoft.AspNetCore.Identity;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ConnectionsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _usermanager;

        public ConnectionsController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _usermanager = userManager;
        }

        // GET: api/Connections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Connection>>> GetConnections()
        {
          if (_context.Connections == null)
          {
              return NotFound();
          }
            return await _context.Connections.ToListAsync();
        }

        [HttpGet("{status}")]
        public async Task<ActionResult<IEnumerable<Connection>>> GetConnection(string status)
        {
            if (_context.Connections == null)
            {
                return NotFound();
            }

            switch (status)
            {
                case "New":
                    var newConnections = await _context.Connections.Include(r=>r.Product).Include(r=>r.Product.Brand)
                        .Where(r => r.Status == ConnectionStatus.Pending)
                        .ToListAsync();

                    if (newConnections.Count == 0)
                    {
                        return NotFound();
                    }
                    return newConnections;

                case "Approve":
                    var approvedConnection = await _context.Connections.Include(r => r.Product).Include(r => r.Product.Brand)
                        .Where(r => r.Status == ConnectionStatus.Approved)
                        .ToListAsync(); 
                    if (approvedConnection == null)
                    {
                        return NotFound();
                    }
                    return approvedConnection; 

                case "Reject":
                    var rejectedConnection = await _context.Connections.Include(r => r.Product).Include(r => r.Product.Brand)
                         .Where(r => r.Status == ConnectionStatus.Rejected)
                         .ToListAsync(); 
                    if (rejectedConnection == null)
                    {
                        return NotFound();
                    }
                    return rejectedConnection; 

                default:
                    return NotFound(); 
            }
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutConnection(string id, Connection connection)
        {
            if (id != connection.LpgNo)
            {
                return BadRequest();
            }

            _context.Entry(connection).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ConnectionExists(id))
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

        [HttpPost]
        public async Task<ActionResult<Connection>> PostConnection([FromForm]ConnectionDTO connectionDTO)
        {
          if (_context.Connections == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Connections'  is null.");
          }
          if (!Enum.TryParse(typeof(RelatedType), connectionDTO.RelatedType.ToString(), out var relatedType))
            {
                return BadRequest("Invalid brand status.");
            }

            var user =await _usermanager.FindByIdAsync(connectionDTO.UserId);

            var connection = new Connection
            {
                LpgNo = GenerateUniqueID(),
                FirstName = connectionDTO.FirstName,
                LastName = connectionDTO.LastName,
                Gender= connectionDTO.Gender,
                MaritalStatus= connectionDTO.MaritalStatus,
                Dob= connectionDTO.Dob,
                Nationality= connectionDTO.Nationality,
                RelatedType=(RelatedType)relatedType,
                RelatedFirstName=connectionDTO.FirstName,
                RelatedLastName=connectionDTO.LastName,
                Address=connectionDTO.Address,
                District=connectionDTO.District,
                State= connectionDTO.State,
                PinCode = connectionDTO.PinCode,
                ProductId=Guid.Parse(connectionDTO.ProductId),
                EmailId = connectionDTO.EmailId,
                PhoneNumber = connectionDTO.PhoneNumber,
                IsPNG= connectionDTO.IsPNG,
                IsGovScheme= connectionDTO.IsGovScheme,
                AadharCardNo= connectionDTO.AadharCardNo,
                RationCardNumber = connectionDTO.RationCardNumber,
                POAName=connectionDTO.POAName,
                POANo=connectionDTO.POANo,
                POIName=connectionDTO.POIName,
                POINo=connectionDTO.POINo,
                RationState=connectionDTO.RationState,
                UserId = Guid.Parse(connectionDTO.UserId)
            };
            if (connectionDTO.POI != null)
            {
                byte[] fileBytes;
                using (var ms = new MemoryStream())
                {
                    await connectionDTO.POI.CopyToAsync(ms);
                    fileBytes = ms.ToArray();
                }

                Account account = new Account(
                    "ddcpygqpz",
                    "355678217655168",
                    "oOu6_mF-OAC9vJs65scbc1c_e4M");

                Cloudinary cloudinary = new Cloudinary(account);

                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription("POI", new MemoryStream(fileBytes)),
                };

                var uploadResult = await cloudinary.UploadAsync(uploadParams);

                connection.POI = uploadResult.SecureUrl.ToString();
            }
            if (connectionDTO.POA != null)
            {
                byte[] fileBytes;
                using (var ms = new MemoryStream())
                {
                    await connectionDTO.POA.CopyToAsync(ms);
                    fileBytes = ms.ToArray();
                }

                Account account = new Account(
                    "ddcpygqpz",
                    "355678217655168",
                    "oOu6_mF-OAC9vJs65scbc1c_e4M");

                Cloudinary cloudinary = new Cloudinary(account);

                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription("POA", new MemoryStream(fileBytes)),
                };

                var uploadResult = await cloudinary.UploadAsync(uploadParams);

                connection.POA = uploadResult.SecureUrl.ToString();
            }
            if (connectionDTO.PhotoGraph != null)
            {
                byte[] fileBytes;
                using (var ms = new MemoryStream())
                {
                    await connectionDTO.PhotoGraph.CopyToAsync(ms);
                    fileBytes = ms.ToArray();
                }

                Account account = new Account(
                    "ddcpygqpz",
                    "355678217655168",
                    "oOu6_mF-OAC9vJs65scbc1c_e4M");

                Cloudinary cloudinary = new Cloudinary(account);

                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription("Photogragh", new MemoryStream(fileBytes)),
                };

                var uploadResult = await cloudinary.UploadAsync(uploadParams);

                connection.PhotoGraph = uploadResult.SecureUrl.ToString();
            }

            var connectionRequest = new AdminRequest
            {
                Description = "New Connection Request",
                Id=Guid.Parse(connectionDTO.UserId),
                RequestTypeName = RequestType.Connection
            };
            user.IsHasConnection= true;
            await _usermanager.UpdateAsync(user);
            _context.AdminRequests.Add(connectionRequest);
            _context.Connections.Add(connection);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ConnectionExists(connection.LpgNo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetConnection", new { id = connection.LpgNo }, connection);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConnection(string id)
        {
            if (_context.Connections == null)
            {
                return NotFound();
            }
            var connection = await _context.Connections.FindAsync(id);
            if (connection == null)
            {
                return NotFound();
            }

            _context.Connections.Remove(connection);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ConnectionExists(string id)
        {
            return (_context.Connections?.Any(e => e.LpgNo == id)).GetValueOrDefault();
        }

        [NonAction]
        public string GenerateUniqueID()
        {
            long timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(); // Get current timestamp
            Random random = new Random();
            int randomDigits = random.Next(100000000, 999999999); // Generate random 9-digit number

            string uniqueID = timestamp.ToString() + randomDigits.ToString(); // Combine timestamp and random digits
            return uniqueID.Substring(0, 17); // Ensure length of 17 digits
        }
    }
}

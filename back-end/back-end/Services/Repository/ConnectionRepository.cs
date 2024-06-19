using back_end.DatabaseContext;
using back_end.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Identity;
using back_end.Domain.Identity;
using back_end.DTO;
using back_end.Enums;
using System.Security.Claims;
using System.Linq.Expressions;
using back_end.ServiceContracts;

namespace back_end.Repositories
{
    public class ConnectionRepository : IConnectionRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly INotificationService _notificationService;

        public ConnectionRepository(ApplicationDbContext context, UserManager<ApplicationUser> userManager,INotificationService notificationService)
        {
            _context = context;
            _userManager = userManager;
            _notificationService= notificationService;
        }

        public async Task<IEnumerable<Connection>> GetConnectionsAsync()
        {
            return await _context.Connections.ToListAsync();
        }

        public async Task<Connection> GetConnectionByIdAsync(string id)
        {
            return await _context.Connections
                .Include(r => r.Product)
                    .Include(r => r.Product.Brand)
                .FirstOrDefaultAsync(p => p.LpgNo == id);
        }

        public async Task<PagedConnectionsResult<Connection>> GetConnectionsByStatusAsync(string status, int page, int pageSize, string search = null)
        {
            IQueryable<Connection> query = _context.Connections
                .Include(r => r.Product)
                .Include(r => r.Product.Brand);

            switch (status)
            {
                case "New":
                    query = query.Where(r => r.Status == ConnectionStatus.Pending);
                    break;

                case "Approve":
                    query = query.Where(r => r.Status == ConnectionStatus.Approved);
                    break;

                case "Reject":
                    query = query.Where(r => r.Status == ConnectionStatus.Rejected);
                    break;

                default:
                    return null;
            }

            if (!string.IsNullOrEmpty(search))
            {
                var searchLower = search.ToLower();
                query = query.Where(r => r.RationCardNumber.ToLower().Contains(searchLower));
            }

            var totalConnections = await query.CountAsync();

            var pagedConnections = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedConnectionsResult<Connection>
            {
                PagedConnections = pagedConnections,
                TotalConnections = totalConnections
            };
        }

        public async Task<Connection> UpdateConnectionAsync(string id,string status)
        {

            var existingConnection = await _context.Connections.FindAsync(id);
            var user = await _userManager.FindByIdAsync(existingConnection.UserId.ToString());

            if (existingConnection == null)
                return null;
            if (!Enum.TryParse(typeof(ConnectionStatus),status.ToString(), out var Status))
            {
                throw new Exception("Invalid brand status.");
            }

            existingConnection.Status=(ConnectionStatus)Status;

            _context.Connections.Update(existingConnection);
            await _context.SaveChangesAsync();
            await _notificationService.SendNotificationAsync(user.FcsToken, "Connection Status", $"Connection {status}!!");

            return existingConnection;
        }

        public async Task<Connection> CreateConnectionAsync(ConnectionDTO connectionDTO)
        {
            var admins = await _userManager.GetUsersInRoleAsync("Admin");
            var adminEmail = admins.FirstOrDefault().Email;
            var admindata = await _userManager.FindByEmailAsync(adminEmail);
            if (_context.Connections == null)
            {
                throw new Exception("Entity set 'ApplicationDbContext.Connections' is null.");
            }

            if (!Enum.TryParse(typeof(RelatedType), connectionDTO.RelatedType.ToString(), out var relatedType))
            {
                throw new Exception("Invalid brand status.");
            }

            var user = await _userManager.FindByIdAsync(connectionDTO.UserId);

            var connection = new Connection
            {
                LpgNo = GenerateUniqueID(),
                FirstName = connectionDTO.FirstName,
                LastName = connectionDTO.LastName,
                Gender = connectionDTO.Gender,
                MaritalStatus = connectionDTO.MaritalStatus,
                Dob = connectionDTO.Dob,
                Nationality = connectionDTO.Nationality,
                RelatedType = (RelatedType)relatedType,
                RelatedFirstName = connectionDTO.FirstName,
                RelatedLastName = connectionDTO.LastName,
                Address = connectionDTO.Address,
                District = connectionDTO.District,
                State = connectionDTO.State,
                PinCode = connectionDTO.PinCode,
                ProductId = Guid.Parse(connectionDTO.ProductId),
                EmailId = connectionDTO.EmailId,
                PhoneNumber = connectionDTO.PhoneNumber,
                IsPNG = connectionDTO.IsPNG,
                IsGovScheme = connectionDTO.IsGovScheme,
                AadharCardNo = connectionDTO.AadharCardNo,
                RationCardNumber = connectionDTO.RationCardNumber,
                POAName = connectionDTO.POAName,
                POANo = connectionDTO.POANo,
                POIName = connectionDTO.POIName,
                POINo = connectionDTO.POINo,
                RationState = connectionDTO.RationState,
                UserId = Guid.Parse(connectionDTO.UserId)
            };


            // Set POI
            if (connectionDTO.POI != null)
            {
                connection.POI = await UploadImageToCloudinaryAsync(connectionDTO.POI);
            }

            // Set POA
            if (connectionDTO.POA != null)
            {
                connection.POA = await UploadImageToCloudinaryAsync(connectionDTO.POA);
            }

            // Set PhotoGraph
            if (connectionDTO.PhotoGraph != null)
            {
                connection.PhotoGraph = await UploadImageToCloudinaryAsync(connectionDTO.PhotoGraph);
            }

            user.IsHasConnection = true;
            await _userManager.UpdateAsync(user);

            _context.Connections.Add(connection);
            await _context.SaveChangesAsync();
            await _notificationService.SendNotificationAsync(admindata.FcsToken, "New Connection","New Connection Request Received!!");
            return connection;
        }
        public async Task<bool> DeleteConnectionAsync(string id)
        {
            var connectionToDelete = await _context.Connections.FindAsync(id);
            if (connectionToDelete == null)
                return false;

            _context.Connections.Remove(connectionToDelete);
            await _context.SaveChangesAsync();

            return true;
        }
        public string GenerateUniqueID()
        {
            long timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds(); // Get current timestamp
            Random random = new Random();
            int randomDigits = random.Next(100000000, 999999999); // Generate random 9-digit number

            string uniqueID = timestamp.ToString() + randomDigits.ToString(); // Combine timestamp and random digits
            return uniqueID.Substring(0, 17); // Ensure length of 17 digits
        }
        public async Task<string> UploadImageToCloudinaryAsync(IFormFile imageFile)
        {
            byte[] fileBytes;
            using (var ms = new MemoryStream())
            {
                await imageFile.CopyToAsync(ms);
                fileBytes = ms.ToArray();
            }

            Account account = new Account(
                "ddcpygqpz",
                "355678217655168",
                "oOu6_mF-OAC9vJs65scbc1c_e4M");

            Cloudinary cloudinary = new Cloudinary(account);

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription("Product Image", new MemoryStream(fileBytes)),
            };

            var uploadResult = await cloudinary.UploadAsync(uploadParams);

            return uploadResult.SecureUrl.ToString();
        }

        public async Task<bool> CheckConnectionAppliedAsync(ClaimsPrincipal user)
        {
            var userIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User ID not found in token.");
            }

            var userId = userIdClaim.Value;

            var userData = await _userManager.FindByIdAsync(userId);
            if (userData == null)
            {
                throw new Exception("User Not Found");
            }
            if(userData.IsHasConnection)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public async Task<bool> CheckConnectionLinkedAsync(ClaimsPrincipal user)
        {
            var userIdClaim = user.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
            {
                throw new UnauthorizedAccessException("User ID not found in token.");
            }

            var userId = userIdClaim.Value;

            var userData = await _userManager.FindByIdAsync(userId);
            if (userData == null)
            {
                throw new Exception("User Not Found");
            }
            if (userData.IsHasConnectionLinked)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}

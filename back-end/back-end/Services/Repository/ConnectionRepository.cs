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

namespace back_end.Repositories
{
    public class ConnectionRepository : IConnectionRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ConnectionRepository(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<IEnumerable<Connection>> GetConnectionsAsync()
        {
            return await _context.Connections.ToListAsync();
        }

        public async Task<IEnumerable<Connection>> GetConnectionsByStatusAsync(string status)
        {
            switch (status)
            {
                case "New":
                    return await _context.Connections.Include(r => r.Product).Include(r => r.Product.Brand)
                        .Where(r => r.Status == ConnectionStatus.Pending)
                        .ToListAsync();

                case "Approve":
                    return await _context.Connections.Include(r => r.Product).Include(r => r.Product.Brand)
                        .Where(r => r.Status == ConnectionStatus.Approved)
                        .ToListAsync();

                case "Reject":
                    return await _context.Connections.Include(r => r.Product).Include(r => r.Product.Brand)
                        .Where(r => r.Status == ConnectionStatus.Rejected)
                        .ToListAsync();

                default:
                    return null; 
            }
        }

        public async Task<Connection> UpdateConnectionAsync(string id, Connection updatedConnection)
        {
            var existingConnection = await _context.Connections.FindAsync(id);
            if (existingConnection == null)
                return null;

            // Update existing connection properties

            _context.Entry(existingConnection).CurrentValues.SetValues(updatedConnection);
            await _context.SaveChangesAsync();

            return existingConnection;
        }

        public async Task<Connection> CreateConnectionAsync(ConnectionDTO connectionDTO)
        {
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
    }
}

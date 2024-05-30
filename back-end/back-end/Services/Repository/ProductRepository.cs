using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.DTO;
using back_end.Enums;
using back_end.ServiceContracts.Repository;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext _context;

        public ProductRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PagedProductfResult<Product>> GetProductsAsync(int page, int pageSize, string search = null)
        {

            IQueryable<Product> query = _context.Products
                   .Include(p => p.Brand)
                   .Include(p => p.Category);

            if (!string.IsNullOrEmpty(search))
            {
                var searchLower = search.ToLower();
                query = query.Where(product => product.ProductName.ToLower().Contains(searchLower));
            }

            var totalStaffs = await query.CountAsync();

            var pagedStaffs = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedProductfResult<Product>
            {
                PagedProducts = pagedStaffs,
                TotalProducts = totalStaffs
            };
        }

        public async Task<Product> GetProductByIdAsync(Guid id)
        {
            return await _context.Products
                .Include(p => p.Brand)
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.ProductId == id);
        }

        public async Task<Product> UpdateProductAsync(Guid id, ProductDTO productDTO)
        {
            var existingProduct = await _context.Products.FindAsync(id);
            if (existingProduct == null)
            {
                return null;
            }
            if (!Enum.TryParse(typeof(Status), productDTO.Status, out var statusObj))
            {
                return null;
            }

            var status = (Status)statusObj;

            // Update product properties
            existingProduct.ProductName = productDTO.ProductName;
            existingProduct.BrandId = Guid.Parse(productDTO.BrandId);
            existingProduct.CategoryId = Guid.Parse(productDTO.CategoryId);
            existingProduct.UnitPrice = productDTO.UnitPrice;
            existingProduct.Quantity = productDTO.Quantity;
            existingProduct.CreatedBy = productDTO.CreatedBy;
            existingProduct.Status = status;

            // Upload product image to Cloudinary
            if (productDTO.ProductImage != null)
            {
                existingProduct.ProductImage = await UploadImageToCloudinaryAsync(productDTO.ProductImage);
            }

            await _context.SaveChangesAsync();
            return existingProduct;
        }

        public async Task<Product> CreateProductAsync(ProductDTO productDTO)
        {
            if (!Enum.TryParse(typeof(Status), productDTO.Status, out var statusObj))
            {
                return null;
            }

            var status = (Status)statusObj;

            var newProduct = new Product
            {
                ProductName = productDTO.ProductName,
                BrandId = Guid.Parse(productDTO.BrandId),
                CategoryId = Guid.Parse(productDTO.CategoryId),
                UnitPrice = productDTO.UnitPrice,
                Quantity = productDTO.Quantity,
                CreatedBy = productDTO.CreatedBy,
                Status = status
            };

            // Upload product image to Cloudinary
            if (productDTO.ProductImage != null)
            {
                newProduct.ProductImage = await UploadImageToCloudinaryAsync(productDTO.ProductImage);
            }

            _context.Products.Add(newProduct);
            await _context.SaveChangesAsync();

            return newProduct;
        }

        public async Task<bool> DeleteProductAsync(Guid id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return false;
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Product> GetProduct(Guid id)
        {
            var product = await _context.Products
               .Include(r => r.Brand)
               .FirstOrDefaultAsync(i => i.ProductId == id);

            if (product == null)
            {
                return null;
            }

            return product;
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

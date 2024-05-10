using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.DTO;
using back_end.Enums;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using Microsoft.AspNetCore.Authorization;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]

    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
          if (_context.Products == null)
          {
              return NotFound();
          }

          var Product = await _context.Products.Include(r => r.Brand).Include(r=>r.Category).ToListAsync();
           return Ok(Product);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> PutProduct(Guid id,[FromForm]ProductDTO productDTO)
        {
            if (id.ToString() != productDTO.ProductId)
            {
                return BadRequest();
            }

            var existingdata = await _context.Products.FirstOrDefaultAsync(r => r.ProductId == id);
            if (existingdata == null)
            {
                return BadRequest();
            }
            if (!Enum.TryParse(typeof(Status), productDTO.Status.ToString(), out var status))
            {
                return BadRequest("Invalid brand status.");
            }

            try
            {
                existingdata.ProductId = id;
                existingdata.ProductName = productDTO.ProductName;
                existingdata.BrandId= Guid.Parse(productDTO.BrandId);
                existingdata.CategoryId = Guid.Parse(productDTO.CategoryId);
                existingdata.UnitPrice= productDTO.UnitPrice;
                existingdata.Quantity = productDTO.Quantity;
                existingdata.Status = (Status)status;
                existingdata.CreatedBy = productDTO.CreatedBy;
                if (productDTO.ProductImage != null)
                {
                    byte[] fileBytes;
                    using (var ms = new MemoryStream())
                    {
                        await productDTO.ProductImage.CopyToAsync(ms);
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

                    existingdata.ProductImage = uploadResult.SecureUrl.ToString();
                }

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
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
        public async Task<ActionResult<Product>> PostProduct([FromForm]ProductDTO productDTO)
        {
          if (_context.Products == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Products'  is null.");
          }

            if (!Enum.TryParse(typeof(Status), productDTO.Status.ToString(), out var status))
            {
                return BadRequest("Invalid brand status.");
            }

            var product = new Product
            {
                ProductName= productDTO.ProductName,
                BrandId= Guid.Parse(productDTO.BrandId),
                CategoryId= Guid.Parse(productDTO.CategoryId),
                UnitPrice= productDTO.UnitPrice,
                Quantity= productDTO.Quantity,
                CreatedBy= productDTO.CreatedBy,
                Status=(Status)status,
            };

            if (productDTO.ProductImage != null)
            {
                byte[] fileBytes;
                using (var ms = new MemoryStream())
                {
                    await productDTO.ProductImage.CopyToAsync(ms);
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

                product.ProductImage = uploadResult.SecureUrl.ToString();
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.ProductId }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok("Deleted Successfully");
        }

        private bool ProductExists(Guid id)
        {
            return (_context.Products?.Any(e => e.ProductId == id)).GetValueOrDefault();
        }
    }
}

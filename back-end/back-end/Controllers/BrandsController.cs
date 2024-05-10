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
using Microsoft.AspNetCore.Authorization;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class BrandsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BrandsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Brands
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Brand>>> GetBrands()
        {
          if (_context.Brands == null)
          {
              return NotFound();
          }
            return await _context.Brands.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrand(Guid id)
        {
            if (_context.Brands == null)
            {
                return NotFound();
            }
            var brand = await _context.Brands.FindAsync(id);

            if (brand == null)
            {
                return NotFound();
            }

            return brand;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Brand>> PutBrand(Guid id, BrandDTO brandDTO)
        {
            if (id.ToString() != brandDTO.BrandId)
            {
                return BadRequest();
            }

            var existingdata=await _context.Brands.FirstOrDefaultAsync(r=>r.BrandId==id);
            if (existingdata == null)
            {
                return BadRequest();
            }
            if (!Enum.TryParse(typeof(Status), brandDTO.BrandStatus.ToString(), out var brandStatus))
            {
                return BadRequest("Invalid brand status.");
            }

            try
            {
                existingdata.BrandId = id;
                existingdata.BrandName= brandDTO.BrandName;
                existingdata.BrandStatus = (Status)brandStatus;
                existingdata.CreatedBy = brandDTO.CreatedBy;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrandExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return existingdata;
        }

        [HttpPost]
        public async Task<ActionResult<Brand>> PostBrand([FromBody]BrandDTO brandDTO)
        {
            try
            {
                if (brandDTO == null)
                {
                    return BadRequest("Brand object is null.");
                }

                if (!Enum.TryParse(typeof(Status), brandDTO.BrandStatus.ToString(), out var brandStatus))
                {
                    return BadRequest("Invalid brand status.");
                }

                var brand = new Brand
                {
                    BrandName = brandDTO.BrandName,
                    BrandStatus=(Status)brandStatus,
                    CreatedBy= brandDTO.CreatedBy

                };
                _context.Brands.Add(brand);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetBrand", new { id = brand.BrandId }, brand);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating brand: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(Guid id)
        {
            if (_context.Brands == null)
            {
                return NotFound();
            }
            var brand = await _context.Brands.FindAsync(id);
            if (brand == null)
            {
                return NotFound();
            }

            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();

            return Ok("Brand Deleted Successfully");
        }

        private bool BrandExists(Guid id)
        {
            return (_context.Brands?.Any(e => e.BrandId == id)).GetValueOrDefault();
        }
    }
}

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
    public class CategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
          if (_context.Categories == null)
          {
              return NotFound();
          }
            return await _context.Categories.ToListAsync();
        }


        [HttpPut("{id}")]
        public async Task<ActionResult<Category>> PutBrand(Guid id, CategoryDTO categoryDTO)
        {
            if (id.ToString() != categoryDTO.CategoryId)
            {
                return BadRequest();
            }

            var existingdata = await _context.Categories.FirstOrDefaultAsync(r => r.CategoryId == id);
            if (existingdata == null)
            {
                return BadRequest();
            }
            if (!Enum.TryParse(typeof(Status), categoryDTO.CategoryStatus.ToString(), out var categoryStatus))
            {
                return BadRequest("Invalid brand status.");
            }

            try
            {
                existingdata.CategoryId = id;
                existingdata.CategoryName = categoryDTO.CategoryName;
                existingdata.CategoryStatus = (Status)categoryStatus;
                existingdata.CreatedBy = categoryDTO.CreatedBy;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
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
        public async Task<ActionResult<Category>> PostCategory([FromBody]CategoryDTO categoryDTO)
        {
          if (_context.Categories == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Categories'  is null.");
          }
            if (!Enum.TryParse(typeof(Status), categoryDTO.CategoryStatus.ToString(), out var categoryStatus))
            {
                return BadRequest("Invalid brand status.");
            }
            var category = new Category
            {
                CategoryName= categoryDTO.CategoryName,
                CategoryStatus= (Status)categoryStatus,
                CreatedBy= categoryDTO.CreatedBy,
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCategory", new { id = category.CategoryId }, category);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            if (_context.Categories == null)
            {
                return NotFound();
            }
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return Ok("Deleted Successfully!!");
        }

        private bool CategoryExists(Guid id)
        {
            return (_context.Categories?.Any(e => e.CategoryId == id)).GetValueOrDefault();
        }
    }
}

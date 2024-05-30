using back_end.Domain.Entities;
using back_end.DTO;
using back_end.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoriesController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories(int page, int pageSize, string search = null)
        {
            var categories = await _categoryRepository.GetCategories(page, pageSize, search);
            if (categories == null)
            {
                return NotFound();
            }
            return Ok(categories);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Category>> PutCategory(Guid id, CategoryDTO categoryDTO)
        {
            var updatedCategory = await _categoryRepository.UpdateCategory(id, categoryDTO);
            if (updatedCategory == null)
            {
                return BadRequest();
            }
            return Ok(updatedCategory);
        }

        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory([FromBody] CategoryDTO categoryDTO)
        {
            var createdCategory = await _categoryRepository.CreateCategory(categoryDTO);
            if (createdCategory == null)
            {
                return BadRequest();
            }
            return CreatedAtAction("GetCategory", new { id = createdCategory.CategoryId }, createdCategory);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(Guid id)
        {
            var result = await _categoryRepository.DeleteCategory(id);
            if (!result)
            {
                return NotFound();
            }
            return Ok("Deleted Successfully!!");
        }
    }
}

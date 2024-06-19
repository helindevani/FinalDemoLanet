using back_end.Domain.Entities;
using back_end.DTO;
using back_end.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandRepository _brandRepository;

        public BrandsController(IBrandRepository brandRepository)
        {
            _brandRepository = brandRepository;
        }

        // GET: api/Brands
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Brand>>> GetBrands(int page, int pageSize, string search = null)
        {
            var brands = await _brandRepository.GetBrands(page,pageSize,search);
            if (brands == null)
            {
                return NotFound();
            }
            return Ok(brands);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrand(Guid id)
        {
            var brand = await _brandRepository.GetBrand(id);
            if (brand == null)
            {
                return NotFound();
            }
            return Ok(brand);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Brand>> PutBrand(Guid id, BrandDTO brandDTO)
        {
            var updatedBrand = await _brandRepository.UpdateBrand(id, brandDTO);
            if (updatedBrand == null)
            {
                return BadRequest();
            }
            return Ok(updatedBrand);
        }

        [HttpPost]
        public async Task<ActionResult<Brand>> PostBrand([FromBody] BrandDTO brandDTO)
        {
            var createdBrand = await _brandRepository.CreateBrand(brandDTO);
            if (createdBrand == null)
            {
                return BadRequest();
            }
            return CreatedAtAction("GetBrand", new { id = createdBrand.BrandId }, createdBrand);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(Guid id)
        {
            var result = await _brandRepository.DeleteBrand(id);
            if (!result)
            {
                return NotFound();
            }
            return Ok("Brand Deleted Successfully");
        }
    }
}

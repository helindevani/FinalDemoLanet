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
    [AllowAnonymous]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public ProductsController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts(int page, int pageSize, string search = null)
        {
            var products = await _productRepository.GetProductsAsync(page,pageSize,search);
            if (products == null)
            {
                return NotFound();
            }
            return Ok(products);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Product>> PutProduct(Guid id, [FromForm] ProductDTO productDTO)
        {
            var updatedProduct = await _productRepository.UpdateProductAsync(id, productDTO);
            if (updatedProduct == null)
            {
                return BadRequest();
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromForm] ProductDTO productDTO)
        {
            var createdProduct = await _productRepository.CreateProductAsync(productDTO);
            return CreatedAtAction("GetProduct", new { id = createdProduct.ProductId }, createdProduct);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(Guid id)
        {
            var result = await _productRepository.DeleteProductAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return Ok("Deleted Successfully!!");
        }
    }
}

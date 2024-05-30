using back_end.Domain.Entities;
using back_end.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Repositories
{
    public class PagedProductfResult<T>
    {
        public List<T> PagedProducts { get; set; }
        public int TotalProducts { get; set; }
    }
    public interface IProductRepository
    {
        Task<PagedProductfResult<Product>> GetProductsAsync(int page, int pageSize, string search = null);
        Task<Product> GetProductByIdAsync(Guid id);
        Task<Product> UpdateProductAsync(Guid id, ProductDTO productDTO);
        Task<Product> CreateProductAsync(ProductDTO productDTO);
        Task<bool> DeleteProductAsync(Guid id);
    }
}

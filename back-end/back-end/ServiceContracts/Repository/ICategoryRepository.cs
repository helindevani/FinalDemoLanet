using back_end.Domain.Entities;
using back_end.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Repositories
{
    public class PagedCategoryResult<T>
    {
        public List<T> PagedCategories { get; set; }
        public int TotalCategories { get; set; }
    }
    public interface ICategoryRepository
    {
        Task<PagedCategoryResult<Category>> GetCategories(int page, int pageSize, string search = null);
        Task<Category> GetCategoryById(Guid id);
        Task<Category> UpdateCategory(Guid id, CategoryDTO categoryDTO);
        Task<Category> CreateCategory(CategoryDTO categoryDTO);
        Task<bool> DeleteCategory(Guid id);
    }
}

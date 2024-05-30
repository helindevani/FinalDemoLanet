using back_end.Domain.Entities;
using back_end.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Repositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetCategories();
        Task<Category> UpdateCategory(Guid id, CategoryDTO categoryDTO);
        Task<Category> CreateCategory(CategoryDTO categoryDTO);
        Task<bool> DeleteCategory(Guid id);
    }
}

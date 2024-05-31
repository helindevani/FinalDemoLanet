using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.DTO;
using back_end.Enums;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly ApplicationDbContext _context;

        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PagedCategoryResult<Category>> GetCategories(int page, int pageSize, string search = null)
        {
            IQueryable<Category> query = _context.Categories;

            if (!string.IsNullOrEmpty(search))
            {
                var searchLower = search.ToLower();
                query = query.Where(category => category.CategoryName.ToLower().Contains(searchLower));
            }

            var totalCategories = await query.CountAsync();

            var pagedCategories = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedCategoryResult<Category>
            {
                PagedCategories = pagedCategories,
                TotalCategories = totalCategories
            };
        }

        public async Task<Category> GetCategoryById(Guid id)
        {
            return await _context.Categories.FindAsync(id);
        }

        public async Task<Category> UpdateCategory(Guid id, CategoryDTO categoryDTO)
        {
            var existingData = await _context.Categories.FirstOrDefaultAsync(r => r.CategoryId == id);
            if (existingData == null)
            {
                return null;
            }

            if (!Enum.TryParse(typeof(Status), categoryDTO.CategoryStatus.ToString(), out var categoryStatus))
            {
                return null;
            }

            existingData.CategoryName = categoryDTO.CategoryName;
            existingData.CategoryStatus = (Status)categoryStatus;
            existingData.CreatedBy = categoryDTO.CreatedBy;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return null;
                }
                else
                {
                    throw;
                }
            }

            return existingData;
        }

        public async Task<Category> CreateCategory(CategoryDTO categoryDTO)
        {
            if (!Enum.TryParse(typeof(Status), categoryDTO.CategoryStatus.ToString(), out var categoryStatus))
            {
                return null;
            }

            var category = new Category
            {
                CategoryName = categoryDTO.CategoryName,
                CategoryStatus = (Status)categoryStatus,
                CreatedBy = categoryDTO.CreatedBy
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return category;
        }

        public async Task<bool> DeleteCategory(Guid id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return false;
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return true;
        }

        private bool CategoryExists(Guid id)
        {
            return _context.Categories.Any(e => e.CategoryId == id);
        }
    }
}

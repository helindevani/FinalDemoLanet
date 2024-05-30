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
    public class BrandRepository : IBrandRepository
    {
        private readonly ApplicationDbContext _context;

        public BrandRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PagedBrandResult<Brand>> GetBrands(int page, int pageSize, string search = null)
        {
            IQueryable<Brand> query = _context.Brands;

            if (!string.IsNullOrEmpty(search))
            {
                var searchLower = search.ToLower();
                query = query.Where(brand => brand.BrandName.ToLower().Contains(searchLower));
            }

            var totalBrands = await query.CountAsync();

            var pagedBrands = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedBrandResult<Brand>
            {
                PagedBrands = pagedBrands,
                TotalBrands = totalBrands
            };
        }

        public async Task<Brand> GetBrand(Guid id)
        {
            return await _context.Brands.FindAsync(id);
        }

        public async Task<Brand> UpdateBrand(Guid id, BrandDTO brandDTO)
        {
            var existingData = await _context.Brands.FirstOrDefaultAsync(r => r.BrandId == id);
            if (existingData == null)
            {
                return null;
            }

            if (!Enum.TryParse(typeof(Status), brandDTO.BrandStatus.ToString(), out var brandStatus))
            {
                return null;
            }

            existingData.BrandName = brandDTO.BrandName;
            existingData.BrandStatus = (Status)brandStatus;
            existingData.CreatedBy = brandDTO.CreatedBy;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrandExists(id))
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

        public async Task<Brand> CreateBrand(BrandDTO brandDTO)
        {
            if (!Enum.TryParse(typeof(Status), brandDTO.BrandStatus.ToString(), out var brandStatus))
            {
                return null;
            }

            var brand = new Brand
            {
                BrandName = brandDTO.BrandName,
                BrandStatus = (Status)brandStatus,
                CreatedBy = brandDTO.CreatedBy
            };

            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();

            return brand;
        }

        public async Task<bool> DeleteBrand(Guid id)
        {
            var brand = await _context.Brands.FindAsync(id);
            if (brand == null)
            {
                return false;
            }

            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();

            return true;
        }

        private bool BrandExists(Guid id)
        {
            return _context.Brands.Any(e => e.BrandId == id);
        }
    }
}

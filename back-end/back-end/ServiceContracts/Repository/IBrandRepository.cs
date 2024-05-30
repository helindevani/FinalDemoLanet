using back_end.Domain.Entities;
using back_end.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Repositories
{
    public class PagedBrandResult<T>
    {
        public List<T> PagedBrands { get; set; }
        public int TotalBrands { get; set; }
    }
    public interface IBrandRepository
    {
        Task<PagedBrandResult<Brand>> GetBrands(int page, int pageSize, string search = null);
        Task<Brand> GetBrand(Guid id);
        Task<Brand> UpdateBrand(Guid id, BrandDTO brandDTO);
        Task<Brand> CreateBrand(BrandDTO brandDTO);
        Task<bool> DeleteBrand(Guid id);
    }
}

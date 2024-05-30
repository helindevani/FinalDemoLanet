using back_end.Domain.Entities;
using back_end.DTO;

namespace back_end.ServiceContracts.Repository
{
    public class PagedStaffResult<T>
    {
        public List<T> PagedStaffs { get; set; }
        public int TotalStaffs { get; set; }
    }

    public interface IStaffRepository
    {
        Task<PagedStaffResult<Staff>> GetStaffs(int page, int pageSize, string search = null);
        Task<Staff> GetStaff(Guid id);
        Task<bool> UpdateStaff(Guid id, StaffDTO staffDTO);
        Task<Staff> CreateStaff(StaffDTO staffDTO);
        Task<bool> DeleteStaff(Guid id);
    }
}

using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.Domain.Identity;
using back_end.DTO;
using back_end.Enums;
using back_end.ServiceContracts;
using back_end.ServiceContracts.Repository;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace back_end.Services.Repository
{
    public class StaffRepository : IStaffRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IAccountRepository _accountRepository;

        private readonly UserManager<ApplicationUser> _userManager;

        private readonly IEmailSenderService _emailSender;

        public StaffRepository(ApplicationDbContext context, IAccountRepository accountRepository, IEmailSenderService emailSender)
        {
            _context = context;
            _accountRepository = accountRepository;
            _emailSender = emailSender;
        }

        public async Task<PagedStaffResult<Staff>> GetStaffs(int page, int pageSize, string search = null)
        {
            IQueryable<Staff> query = _context.Staffs;

            if (!string.IsNullOrEmpty(search))
            {
                var searchLower = search.ToLower();
                query = query.Where(staff => staff.StaffName.ToLower().Contains(searchLower));
            }

            var totalStaffs = await query.CountAsync();

            var pagedStaffs = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedStaffResult<Staff>
            {
                PagedStaffs = pagedStaffs,
                TotalStaffs = totalStaffs
            };
        }

        public async Task<Staff> GetStaff(Guid id)
        {
            return await _context.Staffs.FindAsync(id);
        }

        public async Task<bool> UpdateStaff(Guid id, StaffDTO staffDTO)
        {
            var existingData = await _context.Staffs.FirstOrDefaultAsync(r => r.StaffId == id);

            if (existingData == null)
                return false;

            if (!Enum.TryParse(typeof(Status), staffDTO.Status.ToString(), out var status))
                return false;

            existingData.StaffName = staffDTO.StaffName;
            existingData.AadharCardNo = staffDTO.AadharCardNo;
            existingData.Address = staffDTO.Address;
            existingData.PhoneNumber = staffDTO.PhoneNumber;
            existingData.Status = (Status)status;
            existingData.JoiningDate = staffDTO.JoiningDate;
            existingData.CreatedBy = staffDTO.CreatedBy;

            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<Staff> CreateStaff(StaffDTO staffDTO)
        {
            if (!Enum.TryParse(typeof(Status), staffDTO.Status.ToString(), out var status))
                return null;

            var registerDTO = new RegisterDTO
            {
                Name = staffDTO.StaffName,
                Email = staffDTO.EmailId,
                MobaileNo = staffDTO.PhoneNumber,
                Password = $"Staff@{staffDTO.PhoneNumber}",
                ConfirmPassword = $"Staff@{staffDTO.PhoneNumber}",
                Roles = new string[] { "Staff" }
            };
            await _accountRepository.UserRegisterRequest(registerDTO);

            ApplicationUser user = await _userManager.FindByEmailAsync(staffDTO.EmailId);

            string emailContent = $"Your Staff Id Data:<br><br>" +
                                 $"UserName: {staffDTO.EmailId}<br>" +
                                 $"Password : {staffDTO.StaffName}@{staffDTO.PhoneNumber}<br>";

            await _emailSender.SendEmailAsync(staffDTO.EmailId, "You Staff Id Details", emailContent);

            var staff = new Staff
            {
                StaffName = staffDTO.StaffName,
                PhoneNumber = staffDTO.PhoneNumber,
                AadharCardNo = staffDTO.AadharCardNo,
                Address = staffDTO.Address,
                Gender = staffDTO.Gender,
                Status = (Status)status,
                JoiningDate = staffDTO.JoiningDate,
                CreatedBy = staffDTO.CreatedBy,
                EmailId = staffDTO.EmailId
            };

            _context.Staffs.Add(staff);
            await _context.SaveChangesAsync();

            return staff;
        }

        public async Task<bool> DeleteStaff(Guid id)
        {
            var staff = await _context.Staffs.FindAsync(id);
            if (staff == null)
                return false;

            _context.Staffs.Remove(staff);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

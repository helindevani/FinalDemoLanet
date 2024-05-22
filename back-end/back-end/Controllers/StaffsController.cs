using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.DTO;
using back_end.Enums;
using back_end.ServiceContracts.Repository;
using back_end.Domain.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using back_end.ServiceContracts;
using Stripe.Climate;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class StaffsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly IUserRepository _userRepository;

        private readonly UserManager<ApplicationUser> _userManager;

        private readonly IEmailSenderService _emailSender;

        public StaffsController(ApplicationDbContext context, IUserRepository userRepository, UserManager<ApplicationUser> userManager, IEmailSenderService emailSender)
        {
            _context = context;
            _userRepository = userRepository;
            _userManager = userManager;
            _emailSender = emailSender;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Staff>>> GetStaffs()
        {
          if (_context.Staffs == null)
          {
              return NotFound();
          }
            return await _context.Staffs.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Staff>> GetStaff(Guid id)
        {
          if (_context.Staffs == null)
          {
              return NotFound();
          }
            var staff = await _context.Staffs.FindAsync(id);

            if (staff == null)
            {
                return NotFound();
            }

            return staff;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutStaff(Guid id, StaffDTO staffDTO)
        {
            if (id.ToString() != staffDTO.StaffId)
            {
                return BadRequest();
            }
            var existingdata = await _context.Staffs.FirstOrDefaultAsync(r => r.StaffId == id);

            if (existingdata == null)
            {
                return BadRequest();
            }
            if (!Enum.TryParse(typeof(Status), staffDTO.Status.ToString(), out var status))
            {
                return BadRequest("Invalid brand status.");
            }

            try
            {
                existingdata.StaffId = id;
                existingdata.StaffName= staffDTO.StaffName;
                existingdata.AadharCardNo=staffDTO.AadharCardNo;
                existingdata.Address= staffDTO.Address;
                existingdata.PhoneNumber= staffDTO.PhoneNumber;
                existingdata.Status = (Status)status;
                existingdata.JoiningDate = staffDTO.JoiningDate;
                existingdata.CreatedBy=staffDTO.CreatedBy;
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StaffExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Staff>> PostStaff([FromBody]StaffDTO staffDTO)
        {
          if (_context.Staffs == null)
          {
              return Problem("Entity set 'ApplicationDbContext.Staffs'  is null.");
          }
            if (!Enum.TryParse(typeof(Status), staffDTO.Status.ToString(), out var status))
            {
                return BadRequest("Invalid brand status.");
            }

            var registerDTO = new RegisterDTO
            {
                Name = staffDTO.StaffName,
                Email = staffDTO.EmailId,
                MobaileNo = staffDTO.PhoneNumber,
                Password = $"Staff@{staffDTO.PhoneNumber}",
                ConfirmPassword = $"Staff@{staffDTO.PhoneNumber}",
                Roles = new string[] { "Staff" }
            };

            await _userRepository.UserRegisterRequest(registerDTO);

            ApplicationUser user= await _userManager.FindByEmailAsync(staffDTO.EmailId);

            string emailContent = $"Your Staff Id Data:<br><br>" +
                                 $"UserName: {staffDTO.EmailId}<br>" +
                                 $"Password : {staffDTO.StaffName}@{staffDTO.PhoneNumber}<br>";

            await _emailSender.SendEmailAsync(staffDTO.EmailId, "You Staff Id Details", emailContent);

            var staff = new Staff
            {
                StaffId=user.Id,
                StaffName = staffDTO.StaffName,
                PhoneNumber = staffDTO.PhoneNumber,
                AadharCardNo= staffDTO.AadharCardNo,
                Address = staffDTO.Address,
                Gender = staffDTO.Gender,
                Status= (Status)status,
                JoiningDate = staffDTO.JoiningDate,
                CreatedBy = staffDTO.CreatedBy,
                EmailId=staffDTO.EmailId
            };

            _context.Staffs.Add(staff);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStaff", new { id = staff.StaffId }, staff);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaff(Guid id)
        {
            if (_context.Staffs == null)
            {
                return NotFound();
            }
            var staff = await _context.Staffs.FindAsync(id);
            if (staff == null)
            {
                return NotFound();
            }

            _context.Staffs.Remove(staff);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool StaffExists(Guid id)
        {
            return (_context.Staffs?.Any(e => e.StaffId == id)).GetValueOrDefault();
        }
    }
}

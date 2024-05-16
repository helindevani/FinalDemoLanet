using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.DatabaseContext;
using back_end.Domain.Entities;
using back_end.DTO;
using back_end.Enums;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StaffsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Staffs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Staff>>> GetStaffs()
        {
          if (_context.Staffs == null)
          {
              return NotFound();
          }
            return await _context.Staffs.ToListAsync();
        }

        // GET: api/Staffs/5
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

        // PUT: api/Staffs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

        // POST: api/Staffs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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
            var staff = new Staff
            {
                StaffName = staffDTO.StaffName,
                PhoneNumber = staffDTO.PhoneNumber,
                AadharCardNo= staffDTO.AadharCardNo,
                Address = staffDTO.Address,
                Gender = staffDTO.Gender,
                Status= (Status)status,
                JoiningDate = staffDTO.JoiningDate,
                CreatedBy = staffDTO.CreatedBy,
            };

            _context.Staffs.Add(staff);

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetStaff", new { id = staff.StaffId }, staff);
        }

        // DELETE: api/Staffs/5
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

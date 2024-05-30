using Microsoft.AspNetCore.Mvc;
using back_end.Domain.Entities;
using back_end.DTO;
using back_end.ServiceContracts.Repository;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class StaffsController : ControllerBase
    {
        private readonly IStaffRepository _staffRepository;

        public StaffsController(IStaffRepository staffRepository)
        {
            _staffRepository = staffRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Staff>>> GetStaffs(int page, int pageSize, string search = null)
        {
            var result = await _staffRepository.GetStaffs(page, pageSize, search);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Staff>> GetStaff(Guid id)
        {
            var staff = await _staffRepository.GetStaff(id);
            if (staff == null)
                return NotFound();

            return staff;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutStaff(Guid id, StaffDTO staffDTO)
        {
            var success = await _staffRepository.UpdateStaff(id, staffDTO);
            if (!success)
                return BadRequest();

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Staff>> PostStaff([FromBody] StaffDTO staffDTO)
        {
            var staff = await _staffRepository.CreateStaff(staffDTO);
            if (staff == null)
                return BadRequest();

            return CreatedAtAction("GetStaff", new { id = staff.StaffId }, staff);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStaff(Guid id)
        {
            var success = await _staffRepository.DeleteStaff(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}

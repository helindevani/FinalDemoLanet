using Microsoft.AspNetCore.Mvc;
using back_end.Repositories;
using back_end.DTO;
using back_end.Enums;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using back_end.Domain.Entities;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ConnectionsController : ControllerBase
    {
        private readonly IConnectionRepository _connectionRepository;

        public ConnectionsController(IConnectionRepository connectionRepository)
        {
            _connectionRepository = connectionRepository;
        }

        // GET: api/Connections
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Connection>>> GetConnections()
        {
            var connections = await _connectionRepository.GetConnectionsAsync();
            if (connections == null)
            {
                return NotFound();
            }
            return Ok(connections);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Connection>>GetConnection(string id)
        {
            var connections = await _connectionRepository.GetConnectionByIdAsync(id);
            if (connections == null)
            {
                return NotFound();
            }
            return Ok(connections);
        }

        [HttpGet("status")]
        public async Task<ActionResult<IEnumerable<Connection>>> GetConnection([FromQuery]string status, [FromQuery] int page, [FromQuery] int pageSize, [FromQuery] string search = null)
        {
            var connections = await _connectionRepository.GetConnectionsByStatusAsync(status,page,pageSize,search);
            if (connections == null)
            {
                return NotFound();
            }
            return Ok(connections);
        }

        [HttpGet("checkConnectionApplied")]
        public async Task<bool> CheckConnectionApplied()
        {
            var result = await _connectionRepository.CheckConnectionAppliedAsync(User);
            return result;
        }

        [HttpGet("checkConnectionLinked")]
        public async Task<bool> CheckConnectionLinked()
        {
            var result = await _connectionRepository.CheckConnectionLinkedAsync(User);
            return result;
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> PutConnection(string id, [FromQuery] string status)
        {
       
            var updatedConnection = await _connectionRepository.UpdateConnectionAsync(id, status);

            if (updatedConnection == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Connection>> PostConnection([FromForm] ConnectionDTO connectionDTO)
        {
            try
            {
                var createdConnection = await _connectionRepository.CreateConnectionAsync(connectionDTO);
                return CreatedAtAction("GetConnection", new { id = createdConnection.LpgNo }, createdConnection);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteConnection(string id)
        {
            var deleted = await _connectionRepository.DeleteConnectionAsync(id);
            if (!deleted)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}

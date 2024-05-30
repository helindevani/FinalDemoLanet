using back_end.Domain.Entities;
using back_end.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Repositories
{
    public class PagedConnectionsResult<T>
    {
        public List<T> PagedConnections { get; set; }
        public int TotalConnections { get; set; }
    }
    public interface IConnectionRepository
    {
        Task<IEnumerable<Connection>> GetConnectionsAsync();
        Task<PagedConnectionsResult<Connection>> GetConnectionsByStatusAsync(string status, int page, int pageSize, string search = null);
        Task<Connection> UpdateConnectionAsync(string id, Connection updatedConnection);
        Task<Connection> CreateConnectionAsync(ConnectionDTO connectionDTO);
        Task<bool> DeleteConnectionAsync(string id);
        string GenerateUniqueID();
    }
}

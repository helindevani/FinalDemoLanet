using back_end.Domain.Entities;
using back_end.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace back_end.Repositories
{
    public interface IConnectionRepository
    {
        Task<IEnumerable<Connection>> GetConnectionsAsync();
        Task<IEnumerable<Connection>> GetConnectionsByStatusAsync(string status);
        Task<Connection> UpdateConnectionAsync(string id, Connection updatedConnection);
        Task<Connection> CreateConnectionAsync(ConnectionDTO connectionDTO);
        Task<bool> DeleteConnectionAsync(string id);
        string GenerateUniqueID();
    }
}

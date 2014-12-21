using System.Collections.Generic;
using WebApiandSignalR.Models;

namespace WebApiandSignalR.Controllers.ApiControllers.Shared
{
    public interface IUmsController<T> where T : class 
    {
        IEnumerable<T> Get();
        T Get(long id);
        void Post(HubedEntity<T> hubedEntity);
        void Put(HubedEntity<T> hubedEntity);
        void Delete(HubedEntity<T> hubedEntity);
    }
}

using System.Data.Entity;
using WebApiandSignalR.DbContext.Context.Shared;
using WebApiandSignalR.DbContext.Shared;

namespace WebApiandSignalR.DbContext.Context
{
    public class FakeUmsContext : IUmsContext
    {
        public IDbSet<Student> Students { get; set; }

        public FakeUmsContext()
        {
            this.Students = LocalDb.Students;
        }

        public int SaveChanges()
        {
            return 1;
        }
    }
}
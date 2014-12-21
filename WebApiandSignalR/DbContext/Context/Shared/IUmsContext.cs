using System.Data.Entity;

namespace WebApiandSignalR.DbContext.Context.Shared
{
    public interface IUmsContext
    {
        IDbSet<Student> Students { get; set; }

        int SaveChanges();
    }
}

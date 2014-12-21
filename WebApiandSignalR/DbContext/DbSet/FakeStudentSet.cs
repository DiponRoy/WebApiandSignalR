using System.Linq;
using WebApiandSignalR.DbContext.DbSet.Shared;

namespace WebApiandSignalR.DbContext.DbSet
{
    public class FakeStudentSet : FakeDbSet<Student>
    {
        public override Student Find(params object[] keyValues)
        {
            return _data.FirstOrDefault(x => x.Id == (long)keyValues.First());
        }

        public override Student Add(Student entity)
        {
            long currentMaxId = (_data.Count == 0) ? _data.Count : _data.Select(x => x.Id).ToList().Max();
            entity.Id = ++currentMaxId;
            return base.Add(entity);
        }

        public override Student Attach(Student entity)
        {
            return base.Add(entity);
        }

    }
}
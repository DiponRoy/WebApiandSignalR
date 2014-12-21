using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;

namespace WebApiandSignalR.DbContext.DbSet.Shared
{
    public class FakeDbSet<TEntity> : IDbSet<TEntity> where TEntity : class
    {
        protected List<TEntity> _data { get; set; }


        public FakeDbSet()
        {
            _data = new List<TEntity>();
        }

        public IEnumerator<TEntity> GetEnumerator()
        {
            return _data.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        public Expression Expression { get; private set; }
        public Type ElementType { get; private set; }
        public IQueryProvider Provider { get; private set; }

        public virtual TEntity Find(params object[] keyValues)
        {
            throw new NotImplementedException();
        }

        public virtual TEntity Add(TEntity entity)
        {
            _data.Add(entity);
            return entity;
        }

        public virtual TEntity Remove(TEntity entity)
        {
            _data.Remove(entity);
            return entity;
        }

        public virtual TEntity Attach(TEntity entity)
        {
            return Add(entity);
        }

        public TEntity Create()
        {
            throw new NotImplementedException();
        }

        public TDerivedEntity Create<TDerivedEntity>() where TDerivedEntity : class, TEntity
        {
            throw new NotImplementedException();
        }

        public ObservableCollection<TEntity> Local { get; private set; }
    }
}
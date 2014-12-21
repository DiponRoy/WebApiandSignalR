using System;
using System.Collections.Generic;
using System.Linq;
using WebApiandSignalR.Controllers.ApiControllers.Shared;
using WebApiandSignalR.DbContext;
using WebApiandSignalR.DbContext.Context;
using WebApiandSignalR.DbContext.Context.Shared;
using WebApiandSignalR.DbContext.Shared;
using WebApiandSignalR.Hubs;
using WebApiandSignalR.Models;
using Microsoft.AspNet.SignalR;

namespace WebApiandSignalR.Controllers.ApiControllers
{
    public class StudentController : ApiBaseController, IUmsController<Student>
    {
        public StudentController()
        {
            Context = new FakeUmsContext();
            HubContext = new Lazy<IHubContext>(() => GlobalHost.ConnectionManager.GetHubContext<StudentHub>());
        }

        public IEnumerable<Student> Get()
        {
            return Context.Students.ToList();
        }

        public Student Get(long id)
        {
            return Context.Students.Find(id);
        }

        public void Post(HubedEntity<Student> hubedEntity)
        {
            Context.Students.Add(hubedEntity.Entity);
            Context.SaveChanges();

            /*Calling Hub
             * need to keep is as simple as possible
             * Here only sending inserted object to the page, which requested to Create 
             */
            HubContext.Value.Clients.Client(hubedEntity.ConnectionId).AfterCreated(hubedEntity.Entity);
        }

        public void Put(HubedEntity<Student> hubedEntity)
        {
            var student = Context.Students.Find(hubedEntity.Entity.Id);
            Context.Students.Remove(student);
            Context.Students.Attach(hubedEntity.Entity);
            Context.SaveChanges();

            /*Calling Hub*/
            HubContext.Value.Clients.Client(hubedEntity.ConnectionId).AfterUpdated(hubedEntity.Entity);
        }

        public void Delete(HubedEntity<Student> hubedEntity)
        {
            var id = hubedEntity.Entity.Id;
            var student = Context.Students.Find(id);
            Context.Students.Remove(student);
            Context.SaveChanges();

            /*Calling Hub*/
            HubContext.Value.Clients.Client(hubedEntity.ConnectionId).AfterRemoved(hubedEntity.Entity);
        }
    }
}

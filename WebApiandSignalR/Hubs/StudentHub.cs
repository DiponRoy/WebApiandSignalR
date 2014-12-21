using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApiandSignalR.DbContext;
using Microsoft.AspNet.SignalR;

namespace WebApiandSignalR.Hubs
{
    public class StudentHub : Hub
    {
        public void Created(Student entity)
        {
            /*sending posted entity to all connected users, except who requisted it*/
            Clients.AllExcept(Context.ConnectionId).created(entity);
        }

        public void Updated(Student entity)
        {
            Clients.AllExcept(Context.ConnectionId).updated(entity);
        }

        public void Removed(long studentId)
        {
            Clients.AllExcept(Context.ConnectionId).removed(studentId);
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApiandSignalR.DbContext.Shared;

namespace WebApiandSignalR.DbContext
{
    public class Student : IPrimaryKeyTrack
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
    }
}
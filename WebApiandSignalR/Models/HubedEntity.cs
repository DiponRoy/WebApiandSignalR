using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApiandSignalR.Models
{
    public class HubedEntity<T> where T : class 
    {
        public T Entity { get; set; }
        public string ConnectionId { get; set; }
    }
}
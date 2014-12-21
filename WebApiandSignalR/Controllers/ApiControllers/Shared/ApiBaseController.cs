using System;
using System.Web.Http;
using WebApiandSignalR.DbContext.Context;
using WebApiandSignalR.DbContext.Context.Shared;
using Microsoft.AspNet.SignalR;

namespace WebApiandSignalR.Controllers.ApiControllers.Shared
{
    public abstract class ApiBaseController : ApiController
    {
        protected IUmsContext Context { get; set; }
        protected Lazy<IHubContext> HubContext { get; set; }
    }
}

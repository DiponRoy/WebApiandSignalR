using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace WebApiandSignalR
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            config.Routes.MapHttpRoute(
                name: "ApiWithControllerAndActionAndIdParameter",
                routeTemplate: "api/{controller}/{action}/{id}"
            );

            config.Routes.MapHttpRoute(
                name: "ApiWithControllerAndAction",
                routeTemplate: "api/{controller}/{action}"
            );
        }
    }
}

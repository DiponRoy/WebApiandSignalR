using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;

namespace WebApiandSignalR.Controllers
{
    public class StudentManageController : Controller
    {
        //
        // GET: /StudentManage/

        public ActionResult Index()
        {
            return View("List");
        }

        public ActionResult List()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Update(long id)
        {
            return View(id);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApiandSignalR.DbContext;
using WebApiandSignalR.DbContext.DbSet;
using WebApiandSignalR.DbContext.DbSet.Shared;
using WebApiandSignalR.DbContext.Shared;

namespace WebApiandSignalR
{
    public static class LocalDb
    {
        public static FakeDbSet<Student> Students { get; private set; }

        public static void PopulateData()
        {
            Students = new FakeStudentSet();
            Students.Add(new Student() { FirstName = "Jamal", LastName = "Ali", Address = "Dhaka" });
            Students.Add(new Student() { FirstName = "Jamal1", LastName = "Ali1", Address = "Dhaka1" });
            Students.Add(new Student() { FirstName = "Jamal2", LastName = "Ali2", Address = "Dhaka2" });

        }
    }
}
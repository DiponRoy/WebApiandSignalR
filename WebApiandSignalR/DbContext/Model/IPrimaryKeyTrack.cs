using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApiandSignalR.DbContext.Shared
{
    public interface IPrimaryKeyTrack
    {
        long Id { get; set; }
    }
}

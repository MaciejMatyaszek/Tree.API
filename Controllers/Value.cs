using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Tree.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ValueController : Controller
    {
       
        [HttpGet]
        public IActionResult value()
        {
            return View();
        }
        
    }
}

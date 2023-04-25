using AjaxDemo.Models;
using Microsoft.AspNetCore.Mvc;

namespace AjaxDemo.Controllers
{
    public class RandomDataController : Controller
    {
        private static Random _rnd = new Random();

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetNumber(int from, int to)
        {
            //var obj = new
            //{
            //    Name = "John",
            //    Age = 45
            //};

            //obj.Name = "asdfasf";

            return Json(new { Number = _rnd.Next(from, to) });
        }
    }
}

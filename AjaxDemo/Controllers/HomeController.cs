using AjaxDemo.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace AjaxDemo.Controllers
{
    public class HomeController : Controller
    {
        private string _connectionString = @"Data Source=.\sqlexpress;Initial Catalog=ListPeoplePost;Integrated Security=true;";

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult GetPeople()
        {
            //Thread.Sleep(2000);
            var repo = new PeopleRepo(_connectionString);
            List<Person> people = repo.GetAll();
            return Json(people);
        }

        [HttpPost]
        public void AddPerson(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Add(person);
        }

        [HttpPost]
        public void Delete(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Delete(id);
        }

        public IActionResult GetById(int id)
        {
            var repo = new PeopleRepo(_connectionString);
            return Json(repo.GetById(id));
        }

        [HttpPost]
        public void Update(Person person)
        {
            var repo = new PeopleRepo(_connectionString);
            repo.Update(person);
        }

    }
}
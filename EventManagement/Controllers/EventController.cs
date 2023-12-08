using EMS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.Metrics;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EventManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {

        private readonly EventManagementContext _db;

        public EventController(EventManagementContext db)
        {
            _db = db;
        }
        
        // GET: api/<CountriesController>
        [HttpGet]
        [Authorize]
        public IEnumerable<Event> Get()
        {
            return _db.Events.ToList();
        }

        [HttpGet]
        [Route("Participants")]
        //[Authorize]
        public IEnumerable<Participant> Get1()
        {
            return _db.Participants.ToList();
        }
        
        // GET: api/<EventController>
        /*[HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }*/

        // GET api/<EventController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
        /*
        // LINQ statement to get country info including population
        [HttpGet("Population/{id}")]
        public Event? GetPopulation(int id)
        {
            /*
            * SELECT ID, NAME, COUNT(City.Population)
            * FROM Countries
            * WHERE Countries.ID = ID
            *
            */
            /*return _db.Countries.Where(c => c.Id == id)
            2 | P a g e
            .Select(c => new CountryPopulation()
            {
            Id = c.Id,
            Name = c.Name,
            Population = c.Cities.Sum(t => t.Population)
            }).SingleOrDefault();
            return (from Events in _db.Events
                    where Events.EventId == id
                    select Event
                    {
                        EventId = Events.EventId,
                        Name = Events.name,
                    }
                    ).SingleOrDefault();
                    select new CountryPopulation()
                    {
                        Id = country.Id,
                        Name = country.Name,
                        Population = country.Cities.Sum(t => t.Population)
                    }).SingleOrDefault();*/
        //}//end GetPopulation



        // POST api/<EventController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<EventController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<EventController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

using EMS;
using EventManagement.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Diagnostics.Metrics;
using System.Linq;

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
        [Authorize]
        public IEnumerable<Participant> Get1()
        {
            return _db.Participants.ToList();
        }

        [HttpGet("Entries")]
        [Authorize]
        public IEnumerable<EventEntries> GetEntries()
        {
            return (from Events in _db.Events
                    join part in _db.Participants on Events.EventId equals part.eId into eventParticipants
                    select new EventEntries
                    {
                        Id = Events.EventId,
                        Name = Events.Name,
                        TotalEntries = eventParticipants.Sum(part => part.EntryVal)
                    }
                    ).ToList();
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

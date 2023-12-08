using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using CsvHelper;
using Microsoft.AspNetCore.Identity;
using EMS;
using System.Diagnostics.Metrics;

namespace EventManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController : ControllerBase
    {
        private readonly EventManagementContext _db;
        private readonly UserManager<EventManagementUser> _userManager;
        //private readonly string _pathName;

        public SeedController(EventManagementContext db, IWebHostEnvironment environment,
            UserManager<EventManagementUser> userManager)
        {
            _db = db;
            _userManager = userManager;
            //_pathName = Path.Combine(environment.ContentRootPath, "Data/worldcities.csv");
        }

        [HttpPost("Users")]
        public async Task<IActionResult> ImportUsersAsync()
        {
            //List<WorldCitiesUser> userList = new();

            (string name, string email) = ("user3", "guser@umail.com");
            EventManagementUser user = new()
            {
                UserName = name,
                Email = email,
                SecurityStamp = Guid.NewGuid().ToString()
            };
            if (await _userManager.FindByNameAsync(name) is not null)
            {
                user.UserName = "user3";
            }
            _ = await _userManager.CreateAsync(user, "P@ssw0rd1!")
                                ?? throw new InvalidOperationException();
            user.EmailConfirmed = true;
            user.LockoutEnabled = false;
            await _db.SaveChangesAsync();

            return Ok();
        }        
    }
}

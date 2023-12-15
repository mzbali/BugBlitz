using API.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers;
[Route("api/[controller]")]
public class AccountController : BaseController
{
    private readonly AppDbContext _context;

    public AccountController(AppDbContext context)
    {
        _context = context;

    }

    [HttpGet("users")]
    public async Task<ActionResult<List<object>>> GetUsers()
    {
        var users = await _context.Users
        .Where(u => u.Username != User.Identity.Name)
        .Select(u => new { u.Username, u.FullName })
        .ToListAsync();

        return Ok(users);
    }
}

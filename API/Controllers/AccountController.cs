using API.DTOs;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController: ControllerBase
{
    private readonly UserManager<User> _userManager;
    private readonly TokenService _tokenService;

    public AccountController(UserManager<User> userManager, TokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;

    }
    
    [HttpPost("signin")]
    public async Task<ActionResult<AccountDto>> SignIn(SignInDto signInDto)
    {
        var user = await _userManager.FindByNameAsync(signInDto.UserName);
        if (user is null || !await _userManager.CheckPasswordAsync(user, signInDto.Password))
            return Unauthorized();
        return new AccountDto
        {
            Name = user.UserName,
            Token = await _tokenService.GenerateTokenAsync(user)
        };
    }
    
    [HttpPost("signup")]
    public async Task<ActionResult<AccountDto>> SignUp(SignUpDto signUpDto)
    {
        var user = new User
        {
            FullName = signUpDto.FullName,
            UserName = signUpDto.UserName,
            Email = signUpDto.Email
        };

        var result = await _userManager.CreateAsync(user, signUpDto.Password);

        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(error.Description, error.Code);
            }

            return ValidationProblem();
        }

        await _userManager.AddToRoleAsync(user, "Member");

        return StatusCode(201);
    }

    [HttpGet("GetAccount")]
    public async Task<ActionResult<AccountDto>> GetAccount()
    {
        var user = await _userManager.FindByNameAsync(User.Identity.Name);

        if (user is null)
        {
            return NotFound();
        }

        return new AccountDto
        {
            Name = user.UserName,
            Token = await _tokenService.GenerateTokenAsync(user)
        };
    }
    
    [Authorize]
    [HttpGet("GetAllAccounts")]
    public async Task<ActionResult<List<string>>> GetAllAccount()
    {
        var user = await _userManager.Users.Select(u=>u.UserName).ToListAsync();

        if (user.Count <= 0)
        {
            return NotFound("No users found");
        }

        return Ok(user);
    }
}

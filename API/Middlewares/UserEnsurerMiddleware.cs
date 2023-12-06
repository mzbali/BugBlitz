using System.Security.Claims;
using API.Data;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Middlewares
{
    public class UserEnsurerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<UserEnsurerMiddleware> _logger;


        public UserEnsurerMiddleware(RequestDelegate next, ILogger<UserEnsurerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, AppDbContext dbContext)
        {
            if (context.User.Identity.IsAuthenticated)
            {
                _logger.LogInformation($"Authenticated user: {context.User.Identity.Name}");
                // find the user in the database using the username
                var user = await dbContext.Users.FirstOrDefaultAsync(u => u.Username == context.User.Identity.Name);

                if (user == null)
                {
                    user = new User
                    {
                        Username = context.User.Identity.Name,
                        Fullname = context.User.FindFirst(ClaimTypes.Name)?.Value,
                        Email = context.User.FindFirst(ClaimTypes.Email)?.Value
                    };

                    dbContext.Users.Add(user);
                    await dbContext.SaveChangesAsync();
                }
            }

            await _next(context);
        }
    }
}
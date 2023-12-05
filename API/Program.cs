using API.Data;
using API.Middlewares;
using API.RequestHelpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
TypeAdapterConfig.Configure();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.ApiKey,
        Description = "Put Bearer + your token in the box below",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        BearerFormat = "JWT",
        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };

    c.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            jwtSecurityScheme, new List<string>()
        }
    });
});

builder.Services.AddCors();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = Convert.ToBoolean(builder.Configuration["Keycloak:RequireHttpsMetadata"]);
    x.MetadataAddress = builder.Configuration["Keycloak:MetadataAddress"]!;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidAudience = builder.Configuration["Keycloak:Audience"],
        ValidateIssuer = Convert.ToBoolean(builder.Configuration["Keycloak:Validate-Issuer"]),
        NameClaimType = "preferred_username"
    };
    x.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context =>
        {
            Console.WriteLine($"Authentication Failed: {context.Exception}");
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddAuthorization();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection"); // connectionString of postgres database
builder.Services.AddDbContext<AppDbContext>(opt =>
    opt.UseNpgsql(connectionString) // connection with postgres
);

var app = builder.Build();

using var scope = app.Services.CreateScope(); // get rid of of it after
var context = scope.ServiceProvider.GetRequiredService<AppDbContext>(); // get the DB connection
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>(); // log any error to the console, since no access to eror exception page

try
{
    context.Database.Migrate(); // myigrate any migration
    await DbInitializer.InitializeAsync(context); // populate with dummy data
}
catch (Exception ex)
{
    logger.LogError(ex, "Problem Migrating Data.");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();

app.UseRouting();

app.UseCors(opt =>
{
    opt.AllowAnyHeader()
       .AllowAnyMethod()
       .AllowCredentials()
       .WithOrigins("http://localhost:3000", "https://identity.portfolio.mzbali.com");
});

app.UseAuthentication();

app.UseMiddleware<LogUserNameMiddleware>();

app.UseMiddleware<EnsureUserExistsMiddleware>();

app.UseAuthorization();

app.MapControllers();

app.Run();

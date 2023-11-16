namespace API.DTOs;

public record SignInDto
{
    public string UserName { get; init; }
    public string Password { get; init; }
}

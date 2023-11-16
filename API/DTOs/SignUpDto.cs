namespace API.DTOs;

public record SignUpDto: SignInDto
{
    public string FullName { get; init; }
    public string Email { get; init; }
}

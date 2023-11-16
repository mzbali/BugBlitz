namespace API.DTOs;

public record AccountDto
{
    public string Name { get; init; }
    public string Token { get; init; }
}

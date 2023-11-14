namespace API.DTOs;

public record UserDto
{
    public int Id { get; init; }
    public string Username { get; init; }
}

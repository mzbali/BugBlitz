namespace API.DTOs;

public record MemberDto
{
    public string Username { get; init; }
    public DateTime JoinedAt { get; init; }
}

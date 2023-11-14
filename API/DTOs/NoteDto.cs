namespace API.DTOs;

public record NoteDto
{
    public int Id { get; init; }
    public int BugId { get; init; }
    public string Body { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime UpdatedAt { get; init; }
    public UserDto Author { get; init; }
}

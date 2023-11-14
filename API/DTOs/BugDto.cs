using API.Entities;

namespace API.DTOs;

public record BugDto
{
    public int Id { get; init; }
    public int ProjectId { get; init; }
    public string Title { get; init; }
    public string Description { get; init; }
    public Priority Priority { get; init; }
    public bool IsResolved { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime UpdatedAt { get; init; }
    public DateTime ClosedAt { get; init; }
    public DateTime ReopenedAt { get; init; }
    public UserDto CreatedBy { get; init; }
    public UserDto UpdatedBy { get; init; }
    public UserDto ClosedBy { get; init; }
    public UserDto ReopenedBy { get; init; }
    public List<NoteDto> Notes { get; init; }
}


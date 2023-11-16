using API.Entities;

namespace API.DTOs;

public record BugInputDto
{
    public string Title { get; init; }
    public string Description { get; init; }
    public Priority Priority { get; init; }
}


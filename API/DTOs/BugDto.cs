namespace API.DTOs;

public record BugDto: BugInputDto
{
    public string Id { get; init; }

}

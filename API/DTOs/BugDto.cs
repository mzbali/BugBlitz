namespace API.DTOs;

public record BugDto: BugInputDto
{
    public int Id { get; init; }

}

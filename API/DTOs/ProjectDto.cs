namespace API.DTOs;

public record ProjectDto
{
    public int Id { get; init; }
    public string Name { get; init; }
    public MemberDto CreatedBy { get; init; }
    public List<string> Members { get; init; }
    public List<BugDto> Bugs { get; init; }
    public DateTime CreatedAt { get; init; }
    public bool IsResolved { get; init; }
}

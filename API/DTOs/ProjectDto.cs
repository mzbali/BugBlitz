namespace API.DTOs;

public record ProjectDto
{
    public int Id { get; init; }
    public string Name { get; init; }
    public MemberDto CreatedBy { get; init; }
    public List<string> Members { get; init; }
    public int BugsCount { get; init; }

    public DateTime CreatedAt { get; init; }
}

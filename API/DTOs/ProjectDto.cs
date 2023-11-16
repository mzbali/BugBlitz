namespace API.DTOs;

public record ProjectDto
{
    public int Id { get; init; }
    public string Name { get; init; }
    public MemberDto CreatedBy { get; init; }
    public List<MemberDto> Members { get; init; }
    public ICollection<BugDto> Bugs { get; init; }
}

namespace API.DTOs;

public record BugDto : BugInputDto
{
    public int Id { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime? UpdatedAt { get; init; }

    public MemberDto CreatedBy { get; init; }
    public MemberDto? UpdatedBy { get; init; }

    public List<NoteDto> Note { get; init; }

    public int ProjectId { get; init; }

    public bool IsResolved { get; init; }

}

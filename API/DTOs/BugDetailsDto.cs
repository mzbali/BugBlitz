using API.Entities;
namespace API.DTOs;

public record BugDetailsDto : BugInputDto
{
    public int Id { get; init; }
    public int ProjectId { get; init; }
    public bool IsResolved { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime? UpdatedAt { get; init; }
    public DateTime? ClosedAt { get; init; }
    public DateTime? ReopenedAt { get; init; }
    public MemberDto CreatedBy { get; init; }
    public MemberDto? UpdatedBy { get; init; }
    public MemberDto? ClosedBy { get; init; }
    public MemberDto? ReopenedBy { get; init; }
    public List<NoteDto> Notes { get; init; } = new List<NoteDto>();
}

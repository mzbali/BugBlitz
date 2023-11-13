namespace API.Entities;

public class ProjectMember : BaseEntity
{
    public int ProjectId { get; set; }
    public virtual Project Project { get; set; }

    public int UserId { get; set; }
    public virtual User User { get; set; }
    
    public DateTime JoinedAt { get; set; } = DateTime.UtcNow;
}

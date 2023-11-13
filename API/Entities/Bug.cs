using System.ComponentModel.DataAnnotations;
namespace API.Entities;

public class Bug
{
    public int Id { get; set; }
    [MaxLength(60)]
    public string Title { get; set; }

    public string Description { get; set; }
    public string Priority { get; set; }

    public int ProjectId { get; set; }
    public virtual Project Project { get; set; }

    public ICollection<ProjectNote> Notes { get; set; }
    public bool IsResolved { get; set; }

    public int? ClosedById { get; set; }
    public virtual User ClosedBy { get; set; }
    public DateTime? ClosedAt { get; set; }

    public int? ReopenedById { get; set; }
    public virtual User ReopenedBy { get; set; }
    public DateTime? ReopenedAt { get; set; }

    public int CreatedById { get; set; } 
    public virtual User CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    public int? LastUpdatedById { get; set; }
    public virtual User LastUpdatedBy { get; set; }
    public DateTime? LastUpdatedAt { get; set; }
}

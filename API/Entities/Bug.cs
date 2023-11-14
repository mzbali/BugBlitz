using System.ComponentModel.DataAnnotations;
namespace API.Entities;

public class Bug
{
    public int Id { get; set; }
    [MaxLength(60)]
    public string Title { get; set; }

    public string Description { get; set; }
    public Priority Priority { get; set; } = Priority.Low;

    public int ProjectId { get; set; }
    public virtual Project Project { get; set; }

    public ICollection<Note> Notes { get; set; }
    public bool IsResolved { get; set; } = false;

    public int? ClosedById { get; set; }
    public virtual User ClosedBy { get; set; }
    public DateTime? ClosedAt { get; set; }

    public int? ReopenedById { get; set; }
    public virtual User ReopenedBy { get; set; }
    public DateTime? ReopenedAt { get; set; }

    public int CreatedById { get; set; } 
    public virtual User CreatedBy { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;


    public int? UpdatedById { get; set; }
    public virtual User UpdatedBy { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

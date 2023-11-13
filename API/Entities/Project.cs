using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Project : BaseEntity
{
    [MaxLength(60)] 
    public string Name { get; set; }

    public int CreatedById { get; set; }
    public virtual User CreatedBy { get; set; }

    public ICollection<ProjectMember> Members { get; set; }

    public ICollection<Bug> Bugs { get; set; }
}

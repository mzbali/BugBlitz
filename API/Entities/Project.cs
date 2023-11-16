using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Project : BaseEntity
{
    public int Id { get; set; }
    [MaxLength(60)]
    public string Name { get; set; }

    public int CreatedById { get; set; }
    public virtual User CreatedBy { get; set; }

    public ICollection<Member> Members { get; set; } = new List<Member>();

    public ICollection<Bug> Bugs { get; set; } = new List<Bug>();
}

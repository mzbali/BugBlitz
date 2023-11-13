namespace API.Entities;

public class ProjectNote : BaseEntity
{
    public int Id { get; set; }
    public string Body { get; set; }

    public int AuthorId { get; set; }
    public virtual User Author { get; set; }

    public int BugId { get; set; }
    public virtual Bug Bug { get; set; }
}

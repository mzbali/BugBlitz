namespace API.DTOs;

public record ProjectInputDto
{
    public string Name { get; set; }
    public List<string> Members { get; set; }
}

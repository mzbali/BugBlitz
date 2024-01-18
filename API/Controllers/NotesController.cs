using API.Data;
using API.DTOs;
using API.Entities;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace API.Controllers;

[Route("api/Projects/{projectId}/Bugs/{bugId}/[controller]")]
public class NotesController : BaseController
{
    private readonly AppDbContext _context;

    public NotesController(AppDbContext context)
    {
        _context = context;

    }

    [HttpPost]
    public async Task<IActionResult> CreateNote(int projectId, int bugId, [FromBody] string body)
    {
        if (string.IsNullOrWhiteSpace(body))
            return BadRequest("body is empty");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == User.Identity.Name);
        if (user is null) return NotFound("Could not find the user.");

        var bug = await _context.Bugs.FindAsync(bugId);
        if (bug is null) return NotFound("Could not find the bug.");

        var note = new Note { Author = user, Body = body.Trim(), Bug = bug };

        _context.Notes.Add(note);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return CreatedAtAction(nameof(CreateNote), new { noteId = note.Id, bugId, projectId, });

        return BadRequest(new ProblemDetails
        {
            Title = "Problem creating note."
        });

    }

    [HttpPut("{noteId}")]
    public async Task<ActionResult<NoteDto>> UpdateNote(int bugId, int noteId, [FromBody] string body)
    {
        if (string.IsNullOrWhiteSpace(body))
            return BadRequest("Note body is empty");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == User.Identity.Name);
        if (user is null) return NotFound("Could not find the user.");

        var bug = await _context.Bugs.FindAsync(bugId);
        if (bug is null) return NotFound("Could not find the bug.");

        var note = await _context.Notes.FindAsync(noteId);
        if (note is null) return NotFound("Could not find the note.");

        note.Body = body;
        note.UpdatedAt = DateTime.UtcNow;

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return note.Adapt<NoteDto>();

        return BadRequest(new ProblemDetails
        {
            Title = "Problem updating note."
        });

    }

    [HttpDelete("{noteId}")]
    public async Task<IActionResult> DeleteNote(int noteId)
    {
        var note = await _context.Notes.FindAsync(noteId);
        if (note is null) return NotFound("Could not find the bug");

        _context.Notes.Remove(note);

        var result = await _context.SaveChangesAsync() > 0;

        if (result) return Ok();

        return BadRequest(new ProblemDetails
        {
            Title = "Problem deleting note."
        });
    }
}

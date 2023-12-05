using API.Data;
using API.DTOs;
using API.Entities;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Route("api/Projects/{projectId}/[controller]")]
public class BugsController : BaseController
{
    private readonly AppDbContext _context;

    public BugsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{bugId}", Name = "GetBug")]
    public async Task<ActionResult<BugDetailsDto>> GetBugDetails(int projectId, int bugId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == User.Identity.Name);
        var project = await _context.Projects
        .Include(project => project.CreatedBy)
        .Include(p => p.Members)
        .FirstOrDefaultAsync(p => p.Id == projectId);

        if (project is null) return NotFound("Project not found,");

        if (project.CreatedBy.Username != User.Identity.Name && !project.Members.Any(member => member.UserId == user.Id))
            return Unauthorized("Access is denied. Not a member of the project.");

        var bug = await _context.Bugs
        .Include(b => b.CreatedBy)
        .Include(b => b.UpdatedBy)
        .Include(b => b.ClosedBy)
        .Include(b => b.ReopenedBy)
        .Include(b => b.Notes)
        .FirstOrDefaultAsync(b => b.Id == bugId && b.ProjectId == projectId);

        if (bug is null) return NotFound("Bug not found.");

        return bug.Adapt<BugDetailsDto>();
    }

    [HttpPost]
    public async Task<ActionResult<BugDetailsDto>> CreateBug(int projectId, BugInputDto bugInputDto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == User.Identity.Name);
        var project = await _context.Projects
        .Include(p => p.CreatedBy)
        .Include(p => p.Members)
        .FirstOrDefaultAsync(p => p.Id == projectId);

        if (project is null) return NotFound();

        if (project.CreatedBy.Username != User.Identity.Name && !project.Members.Any(member => member.UserId == user.Id))
            return Unauthorized("Access is denied. Not a member of the project.");

        var newBug = new Bug
        {
            Title = bugInputDto.Title,
            Description = bugInputDto.Description,
            Priority = bugInputDto.Priority,
            Project = project,
            CreatedBy = user,
            CreatedAt = DateTime.UtcNow,
        };

        _context.Bugs.Add(newBug);
        await _context.SaveChangesAsync();

        var createdBugDto = newBug.Adapt<BugDetailsDto>();
        return CreatedAtRoute("GetBug", new { projectId, bugId = newBug.Id }, createdBugDto);
    }

    [HttpDelete("{bugId}")]
    public async Task<ActionResult> DeleteBug(int projectId, int bugId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == User.Identity.Name);
        var project = await _context.Projects
        .Include(project => project.CreatedBy)
        .Include(p => p.Members)
        .FirstOrDefaultAsync(p => p.Id == projectId);

        if (project is null) return NotFound();

        if (project.CreatedBy.Username != User.Identity.Name && !project.Members.Any(member => member.UserId == user.Id))
            return Unauthorized("Can't delete. Not a member of the project.");

        var bug = await _context.Bugs
        .FirstOrDefaultAsync(b => b.Id == bugId && b.ProjectId == projectId);

        if (bug is null) return NotFound(new ProblemDetails { Title = "Could not find the bug" });

        _context.Bugs.Remove(bug);

        var result = await _context.SaveChangesAsync() > 0;
        if (result) return Ok();

        return BadRequest(new ProblemDetails
        {
            Title = "Problem deleting Bug"
        });
    }

    [HttpPut("{bugId}")]
    public async Task<ActionResult<BugDto>> UpdateBug(int projectId, int bugId, [FromBody] BugInputDto bugInputDto)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == User.Identity.Name);
        var project = await _context.Projects
        .Include(project => project.CreatedBy)
        .Include(p => p.Members)
        .FirstOrDefaultAsync(p => p.Id == projectId);

        if (project is null) return NotFound();

        if (project.CreatedBy.Username != User.Identity.Name && !project.Members.Any(member => member.UserId == user.Id))
            return Unauthorized("Access is denied. Not a member of the project.");

        var bug = await _context.Bugs
        .FirstOrDefaultAsync(b => b.Id == bugId && b.ProjectId == projectId);

        if (bug is null) return NotFound(new ProblemDetails { Title = "Could not find the bug" });

        // Check if the bug is resolved, you may want to customize this based on your business logic
        if (bug.IsResolved)
            return BadRequest(new ProblemDetails { Title = "Cannot update a closed bug." });

        // Update bug properties if they are provided in the request
        if (!string.IsNullOrEmpty(bugInputDto.Title))
            bug.Title = bugInputDto.Title;

        if (!string.IsNullOrEmpty(bugInputDto.Description))
            bug.Description = bugInputDto.Description;

        bug.Priority = bugInputDto.Priority;

        // Set the UpdatedBy and UpdatedAt properties
        bug.UpdatedBy = user;
        bug.UpdatedAt = DateTime.UtcNow;

        var result = await _context.SaveChangesAsync() > 0;
        if (result)
            // return updated bug
            return Ok(bug.Adapt<BugDetailsDto>());

        return BadRequest(new ProblemDetails
        {
            Title = "Problem Updating Bugs"
        });
    }


    [HttpPatch("{bugId}/close")]
    public async Task<ActionResult> CloseBug(int projectId, int bugId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == User.Identity.Name);
        var project = await _context.Projects
        .Include(project => project.CreatedBy)
        .Include(p => p.Members)
        .FirstOrDefaultAsync(p => p.Id == projectId);

        if (project is null) return NotFound();

        if (project.CreatedBy.Username != User.Identity.Name && !project.Members.Any(member => member.UserId == user.Id))
            return Unauthorized("Can't close the bug. Not a member of the project.");

        var bug = await _context.Bugs
        .FirstOrDefaultAsync(b => b.Id == bugId && b.ProjectId == projectId);

        if (bug is null) return NotFound(new ProblemDetails { Title = "Could not find the bug" });

        if (bug.IsResolved)
            return BadRequest(new ProblemDetails { Title = "Bug is already marked as closed." });

        bug.IsResolved = true;
        bug.ClosedBy = user;
        bug.ClosedAt = DateTime.UtcNow;
        bug.ReopenedBy = null;
        bug.ReopenedAt = null;

        var result = await _context.SaveChangesAsync() > 0;
        if (result) return Ok();

        return BadRequest(new ProblemDetails
        {
            Title = "Problem Closing Bug"
        });
    }

    [HttpPatch("{bugId}/reopen")]
    public async Task<ActionResult> ReopenBug(int projectId, int bugId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == User.Identity.Name);
        var project = await _context.Projects
        .Include(project => project.CreatedBy)
        .Include(p => p.Members)
        .FirstOrDefaultAsync(p => p.Id == projectId);

        if (project is null) return NotFound();

        if (project.CreatedBy.Username != User.Identity.Name && !project.Members.Any(member => member.UserId == user.Id))
            return Unauthorized("Access is denied.");

        var bug = await _context.Bugs
        .FirstOrDefaultAsync(b => b.Id == bugId && b.ProjectId == projectId);

        if (bug is null) return NotFound(new ProblemDetails { Title = "Could not find the bug" });

        if (!bug.IsResolved)
            return BadRequest(new ProblemDetails { Title = "Bug is already marked as opened." });

        bug.IsResolved = false;
        bug.ReopenedBy = user;
        bug.ReopenedAt = DateTime.UtcNow;
        bug.ClosedBy = null;
        bug.ClosedAt = null;


        var result = await _context.SaveChangesAsync() > 0;
        if (result) return Ok();

        return BadRequest(new ProblemDetails
        {
            Title = "Problem Reopening Bug"
        });
    }

}
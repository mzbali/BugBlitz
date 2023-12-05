using API.Data;
using API.DTOs;
using API.Entities;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProjectsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetProjects")]
        public async Task<ActionResult<List<ProjectDto>>> GetProjects()
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == User.Identity.Name);
            if (user is null)
            {
                return NotFound("User not found.");
            }

            var projects = await _context.Projects
                .Include(p => p.CreatedBy)
                .Include(p => p.Bugs)
                .Include(p => p.Members)
                .ThenInclude(member => member.User)
                .Where(p => p.Members.Any(m => m.User.Username == User.Identity.Name) || p.CreatedById == user.Id)
                .ToListAsync();

            if (projects == null!) return NotFound("Project not found.");

            return projects.Adapt<List<ProjectDto>>();
        }

        [HttpGet("{projectId}")]
        public async Task<ActionResult<ProjectDto>> GetProject(int projectId)
        {
            var project = await _context.Projects
            .Include(p => p.CreatedBy)
            .Include(p => p.Bugs)
            .Include(p => p.Members)
            .ThenInclude(member => member.User)
            .FirstOrDefaultAsync(p => p.Id == projectId);

            if (project == null)
            {
                return NotFound("Project not found.");
            }

            var projectDto = project.Adapt<ProjectDto>();

            return Ok(projectDto);
        }

        [HttpPost]
        public async Task<ActionResult<ProjectDto>> CreateProject([FromBody] ProjectInputDto projectCreateDto)
        {
            // Check if the user exists
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == User.Identity.Name);

            if (user is null)
            {
                return NotFound("User not found.");
            }

            // Check if members are specified for the project
            if (projectCreateDto.Members.Count == 0)
            {
                return BadRequest("At least one member must be specified for the project.");
            }

            // Create the project
            var project = new Project
            {
                Name = projectCreateDto.Name,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
                CreatedBy = user
            };

            // Fetch all users in the member list at once
            var Usernames = projectCreateDto.Members.Distinct();
            var members = await _context.Users.Where(u => Usernames.Contains(u.Username)).ToListAsync();

            // Add other members to the project (avoid duplicates)
            foreach (var member in members)
            {
                // Check if the user is not the creator and is not already a member
                if (member != user && project.Members.All(m => m.User.Username != member.Username))
                {
                    project.Members.Add(new Member { Project = project, User = member, JoinedAt = DateTime.UtcNow });
                }
            }

            // Add the project to the context
            _context.Projects.Add(project);

            // Save changes to the database
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
                // Return the created project
                return CreatedAtRoute("GetProjects", new { projectId = project.Id }, project.Adapt<ProjectDto>());

            return BadRequest(new ProblemDetails
            {
                Title = "Problem creating Project"
            });

        }


        [HttpPut("{projectId}")]
        public async Task<ActionResult<ProjectDto>> UpdateProject(int projectId, [FromBody] ProjectInputDto projectUpdateDto)
        {
            // Check if the user exists
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == User.Identity.Name);

            if (user is null)
            {
                return NotFound();
            }

            // Fetch the project to be updated
            var project = await _context.Projects
            .Include(p => p.CreatedBy)
            .Include(p => p.Members)
            .ThenInclude(member => member.User)
            .FirstOrDefaultAsync(p => p.Id == projectId);

            if (project is null)
            {
                return NotFound("Project not found.");
            }

            // Check if the user is the creator of the project
            if (project.CreatedById != user.Id)
            {
                return Unauthorized("Access is denied. Only the creator can update the project.");
            }

            // Update project name if provided
            if (!string.IsNullOrWhiteSpace(projectUpdateDto.Name))
                project.Name = projectUpdateDto.Name;

            // Update members if provided
            if (projectUpdateDto.Members.Count != 0)
            {
                // Fetch all users in the member list at once
                var Usernames = projectUpdateDto.Members.Distinct();
                var members = await _context.Users.Where(u => Usernames.Contains(u.Username)).ToListAsync();

                // Remove existing members not in the updated list
                var membersToRemove = project.Members
                .Where(m => members.All(member => member.Username != m.User.Username))
                .ToList();

                membersToRemove.ForEach(m => project.Members.Remove(m));

                // Add new members not already in the project
                foreach (var member in members)
                {
                    // Check if the user is not the creator and is not already a member
                    if (member != user && project.Members.All(m => m.User.Username != member.Username))
                    {
                        project.Members.Add(new Member { Project = project, User = member, JoinedAt = DateTime.UtcNow });
                    }
                }
            }

            // Save changes to the database
            var result = await _context.SaveChangesAsync() > 0;

            if (result)
            {
                // Map the updated project to a DTO
                var updatedProjectDto = project.Adapt<ProjectDto>();
                return Ok(updatedProjectDto);
            }

            return BadRequest(new ProblemDetails
            {
                Title = "Problem updating project"
            });
        }



        [HttpDelete("{projectId}")]
        public async Task<ActionResult> DeleteProject(int projectId)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == User.Identity.Name);

            var project = await _context.Projects
            .Include(p => p.CreatedBy)
            .FirstOrDefaultAsync(p => p.Id == projectId);

            if (project == null)
            {
                return NotFound("Project not found.");
            }

            if (project.CreatedBy != user)
            {
                return Unauthorized("Access is denied. Only the project creator can delete the project.");
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

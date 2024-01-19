using API.Entities;

namespace API.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(AppDbContext context)
    {
        if (!context.Users.Any())
        {
            var user1 = new User { Username = "bob", FullName = "Bob Odendrik", Email = "bob@test.com" };
            var user2 = new User { Username = "rifa", FullName = "Rifa Zaman", Email = "rifa@test.com" };
            var admin = new User { Username = "admin", FullName = "Admin Admin", Email = "admin@test.com" };

            var projects = new List<Project>
        {
            new Project { Name = "Project 1", CreatedBy = admin },
            new Project { Name = "Project 2", CreatedBy = admin },
            new Project { Name = "Project 3", CreatedBy = admin },
            new Project { Name = "Project 4", CreatedBy = user1 },
            new Project { Name = "Project 5", CreatedBy = user2 },
        };
            context.Projects.AddRange(projects);

            var bugs = new List<Bug>
        {
            new Bug { Title = "Bug 1", Description = "Description 1. Problems occured.", CreatedBy = user2, Project = projects[0]},
            new Bug { Title = "Bug 2", Description = "Description 2", CreatedBy = admin, Project = projects[0] },
            new Bug { Title = "Bug 3", Description = "Description 3", CreatedBy = user2, Project = projects[0] },
            new Bug { Title = "Bug 4", Description = "Description 4", CreatedBy = user1, Project = projects[3],  IsResolved=true, ClosedBy = admin, ClosedAt = DateTime.UtcNow},
            new Bug { Title = "Bug 5", Description = "Description 5", CreatedBy = user2, Project = projects[4], Priority = Priority.High},
            new Bug { Title = "Bug 6", Description = "Description 6", CreatedBy = admin, Project = projects[1]},
            new Bug { Title = "Bug 7", Description = "Description 7", CreatedBy = admin, Project = projects[1]},
            new Bug { Title = "Bug 8", Description = "Description 8", CreatedBy = admin, Project = projects[2]},
            new Bug { Title = "Bug 9", Description = "Description 9", CreatedBy = admin, Project = projects[2]},
        };
            context.Bugs.AddRange(bugs);

            var members = new List<Member>
        {
            new Member { Project = projects[0], User = admin},
            new Member { Project = projects[0], User = user2 },
            new Member { Project = projects[1], User = admin },
            new Member { Project = projects[1], User = user2 },
            new Member { Project = projects[2], User = admin },
            new Member { Project = projects[2], User = user1 },
            new Member { Project = projects[3], User = user1 },
            new Member { Project = projects[4], User = user2 },
            new Member { Project = projects[1], User = user1 },
            new Member { Project = projects[2], User = user2 },
            new Member { Project = projects[3], User = admin },
            new Member { Project = projects[4], User = admin },
        };
            context.Members.AddRange(members);

            var notes = new List<Note>
        {
            new Note { Body = "ProjectNote 1", Author = admin, Bug = bugs[0] },
            new Note { Body = "ProjectNote 2", Author = user2, Bug = bugs[0] },
            new Note { Body = "ProjectNote 2", Author = admin, Bug = bugs[1] },
            new Note { Body = "ProjectNote 3", Author = user1, Bug = bugs[3] },
            new Note { Body = "ProjectNote 4", Author = user2, Bug = bugs[4] },
        };

            foreach (var note in notes)
            {
                if (members.Any(m => m.User == note.Author && m.Project == note.Bug.Project))
                {
                    context.Notes.Add(note);
                }
            }

            await context.SaveChangesAsync();
        }
    }
}

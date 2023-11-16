using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(AppDbContext context, UserManager<User> userManager)
    {
        if (!userManager.Users.Any())
        {
            var user1 = new User { UserName = "bob", FullName = "Bob Odendrik",Email = "bob@test.com" };
            await userManager.CreateAsync(user1, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user1, "Member");
                
            var user2 = new User { UserName = "rifa", FullName ="Rifa Zaman" ,Email = "rifa@test.com" };
            await userManager.CreateAsync(user2, "Pa$$w0rd");
            await userManager.AddToRoleAsync(user2, "Member");

            var admin = new User { UserName = "admin",FullName = "Admin Admin",Email = "admin@test.com" };
            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRoleAsync(admin, "Admin");

            // Add initial projects
            var projects = new List<Project>
            {
                new Project { Name = "Project 1", CreatedBy = admin },
                new Project { Name = "Project 2", CreatedBy = admin },
                new Project { Name = "Project 3", CreatedBy = admin },
                new Project { Name = "Project 4", CreatedBy = user1 },
                new Project { Name = "Project 5", CreatedBy = user2 },
            };
            context.Projects.AddRange(projects);

            // Add initial bugs
            var bugs = new List<Bug>
            {
                new Bug { Title = "Bug 1", Description = "Description 1", CreatedBy = admin, Project = projects[0]},
                new Bug { Title = "Bug 2", Description = "Description 2", CreatedBy = admin, Project = projects[0] },
                new Bug { Title = "Bug 3", Description = "Description 3", CreatedBy = admin, Project = projects[0] },
                new Bug { Title = "Bug 4", Description = "Description 4", CreatedBy = admin, Project = projects[1] },
                new Bug { Title = "Bug 5", Description = "Description 5", CreatedBy = admin, Project = projects[1], Priority = Priority.High},
                new Bug { Title = "Bug 6", Description = "Description 6", CreatedBy = admin, Project = projects[1] },
                new Bug { Title = "Bug 7", Description = "Description 7", CreatedBy = admin, Project = projects[2], Priority = Priority.High},
                new Bug { Title = "Bug 8", Description = "Description 8", CreatedBy = admin, Project = projects[2] },
                new Bug { Title = "Bug 9", Description = "Description 9", CreatedBy = admin, Project = projects[2], Priority = Priority.Medium},
                new Bug { Title = "Bug 10", Description = "Description 10", CreatedBy = user1, Project = projects[3] },
                new Bug { Title = "Bug 11", Description = "Description 11", CreatedBy = user1, Project = projects[3] },
                new Bug { Title = "Bug 12", Description = "Description 12", CreatedBy = user2, Project = projects[4] }
            };
            context.Bugs.AddRange(bugs);

            // Add initial project members
            var members = new List<Member>
            {
                new Member { Project = projects[0], User = admin },
                new Member { Project = projects[0], User = user1 },
                new Member { Project = projects[1], User = admin },
                new Member { Project = projects[1], User = user2 },
                new Member { Project = projects[1], User = user2 },
                new Member { Project = projects[2], User = admin },
                new Member { Project = projects[2], User = user1 },
                new Member { Project = projects[3], User = user1 },
                new Member { Project = projects[3], User = user2 },
                new Member { Project = projects[4], User = admin },
                new Member { Project = projects[4], User = user2 }
            };
            context.Members.AddRange(members);

            // Add initial notes
            var notes = new List<Note>
            {
                new Note { Body = "ProjectNote 1", Author = admin, Bug = bugs[0] },
                new Note { Body = "ProjectNote 2", Author = admin, Bug = bugs[1] },
                new Note { Body = "ProjectNote 3", Author = user1, Bug = bugs[0] },
                new Note { Body = "ProjectNote 4", Author = user1, Bug = bugs[3] },
                new Note { Body = "ProjectNote 5", Author = user2, Bug = bugs[1] },
                new Note { Body = "ProjectNote 6", Author = user2, Bug = bugs[4] },
                new Note { Body = "ProjectNote 7", Author = admin, Bug = bugs[2] },
                new Note { Body = "ProjectNote 8", Author = admin, Bug = bugs[0] },
                new Note { Body = "ProjectNote 9", Author = admin, Bug = bugs[1] }
            };
            
            /* If the member is a member of the Project the insect attached to, then add it to the notes.*/
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
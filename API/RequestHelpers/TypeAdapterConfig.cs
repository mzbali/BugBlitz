using API.DTOs;
using API.Entities;
using Mapster;

namespace API.RequestHelpers;

public static class TypeAdapterConfig
{
    // Mapping each User object to MemberDto, whenever User is being mapped to MemberDtoMemberDto.

    public static void Configure()
    {
        TypeAdapterConfig<User, MemberDto>.NewConfig()
        .Map(dest => dest.Username, src => src.Username);

        TypeAdapterConfig<Member, MemberDto>.NewConfig()
        .Map(dest => dest.Username, src => src.User.Username);

        TypeAdapterConfig<Project, ProjectDto>.NewConfig()
        .Map(dest => dest.Members, src => src.Members.Adapt<List<MemberDto>>())
        .Map(dest => dest.BugsCount, src => src.Bugs.Count);

        TypeAdapterConfig<Bug, BugDto>.NewConfig()
        .Map(dest => dest.NotesCount, src => src.Notes.Count);

        TypeAdapterConfig<Bug, BugDetailsDto>.NewConfig()
        .Map(dest => dest.Notes, src => src.Notes.Adapt<List<NoteDto>>());

    }
}

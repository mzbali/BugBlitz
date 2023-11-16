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
        .Map(dest => dest.Id, src => src.Id)
        .Map(dest => dest.Username, src => src.UserName);
        
        TypeAdapterConfig<Member, MemberDto>.NewConfig()
        .Map(dest => dest.Id, src => src.User.Id)
        .Map(dest => dest.Username, src => src.User.UserName);

        TypeAdapterConfig<Project, ProjectDto>.NewConfig()
        .Map(dest => dest.Members, src => src.Members.Adapt<List<MemberDto>>());

        TypeAdapterConfig<Bug, BugDetailsDto>.NewConfig()
        .Map(dest => dest.Notes, src => src.Notes.Adapt<List<NoteDto>>());

    }
}

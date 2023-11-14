using API.DTOs;
using API.Entities;
using Mapster;

namespace API.RequestHelpers;

public static class TypeAdapterConfig
{
    // Mapping each User object to UserDto, whenever User is being mapped to UserDto.

    public static void Configure()
    {
        TypeAdapterConfig<User, UserDto>.NewConfig()
        .Map(dest => dest.Id, src => src.Id)
        .Map(dest => dest.Username, src => src.UserName);
    }
}

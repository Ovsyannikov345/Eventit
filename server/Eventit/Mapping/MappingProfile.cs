using AutoMapper;
using Eventit.DataTranferObjects;
using Eventit.Models;
using Server.DataTranferObjects;

namespace Server.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Company, CompanyDto>()
                .ForMember(dest => dest.CompanyContactPerson, opt => opt.MapFrom(src => src.CompanyContactPerson))
                .ReverseMap();
            CreateMap<Company, CompanyRegistrationDto>()
                .ForMember(dest => dest.CompanyContactPerson, opt => opt.MapFrom(src => src.CompanyContactPerson))
                .ReverseMap();
            CreateMap<CompanyContactPerson, CompanyContactPersonDto>()
                .ReverseMap();
            CreateMap<CompanyContactPerson, CompanyContactPersonRegistrationDto>()
                .ReverseMap();
            CreateMap<EventReview, EventReviewDto>()
                .ReverseMap();
            CreateMap<EventReview, EventReviewPostDto>()
                .ReverseMap();
            CreateMap<Event, EventDto>()
                .ForMember(dest => dest.Company, opt => opt.MapFrom(src => src.Company))
                .ForMember(dest => dest.Place, opt => opt.MapFrom(src => src.Place))
                .ReverseMap();
            CreateMap<Place, PlaceDto>()
                .ForMember(dest => dest.PlaceReviews, opt => opt.MapFrom(src => src.PlaceReviews))
                .ReverseMap();
            CreateMap<Place, PlacePostDto>()
                .ReverseMap();
            CreateMap<Event, EventPostDto>()
                .ReverseMap();
            CreateMap<Message, MessagePostDto>()
                .ReverseMap();
            CreateMap<Message, MessageDto>()
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => src.User))
                .ForMember(dest => dest.Company, opt => opt.MapFrom(src => src.Company))
                .ReverseMap();
            CreateMap<Notification, NotificationDto>()
                .ReverseMap();
            CreateMap<Notification, NotificationPostDto>()
                .ReverseMap();
            CreateMap<PlaceReview, PlaceReviewDto>()
                .ForMember(dest => dest.Company, opt => opt.MapFrom(src => src.Company))
                .ReverseMap();
            CreateMap<PlaceReview, PlaceReviewPostDto>()
                .ReverseMap();
            CreateMap<SupportRequest, SupportRequestDto>()
                .ReverseMap();
            CreateMap<SupportRequest, SupportRequestPostDto>()
                .ReverseMap();
            CreateMap<User, UserDto>()
                .ForMember(dest => dest.Events, opt => opt.MapFrom(src => src.Events))
                .ReverseMap();
            CreateMap<User, UserRegistrationDto>()
                .ReverseMap();
            CreateMap<User, UserPutDto>()
                .ReverseMap();
            CreateMap<Chat, ChatDto>()
                .ForMember(dest => dest.Messages, opt => opt.MapFrom(src => src.Messages))
                .ReverseMap();
        }
    }
}

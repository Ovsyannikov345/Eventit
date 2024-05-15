import {
    COMPANY_EVENTS_ROUTE,
    COMPANY_EVENT_DETAILS_ROUTE,
    SPECIFIC_COMPANY_PROFILE_ROUTE,
    SPECIFIC_USER_PROFILE_ROUTE,
    EVENT_CREATION_ROUTE,
    COMPANY_PROFILE_ROUTE,
} from "./../utils/consts";
import CreateEventPage from "../pages/Company/CreateEventPage";
import CompanyProfilePage from "../pages/Company/CompanyProfilePage";
import UserProfilePage from "../pages/User/UserProfilePage";

export const companyRoutes = [
    // TODO implement.
    // {
    //     path: COMPANY_EVENTS_ROUTE,
    //     Component: MyEventsPage,
    // },
    // TODO implement.
    // {
    //     path: COMPANY_EVENT_DETAILS_ROUTE,
    //     Component: CompanyEventDetails,
    // },
    {
        path: SPECIFIC_USER_PROFILE_ROUTE,
        Component: UserProfilePage,
    },
    {
        path: EVENT_CREATION_ROUTE,
        Component: CreateEventPage,
    },
    {
        path: SPECIFIC_COMPANY_PROFILE_ROUTE,
        Component: CompanyProfilePage,
    },
    {
        path: COMPANY_PROFILE_ROUTE,
        Component: CompanyProfilePage,
    },
];

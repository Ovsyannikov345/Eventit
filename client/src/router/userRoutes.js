import {
    USER_PROFILE_ROUTE,
    SPECIFIC_COMPANY_PROFILE_ROUTE,
    SPECIFIC_USER_PROFILE_ROUTE,
    EVENTS_ROUTE,
    USER_EVENT_DETAILS_ROUTE,
    USER_EVENTS_ROUTE,
} from "../utils/consts";
import CompanyProfilePage from "../pages/Company/CompanyProfilePage";
import UserProfilePage from "../pages/User/UserProfilePage";
import UserEventDetailsPage from "../pages/User/UserEventDetailsPage";
import UserSearchEventsPage from "../pages/User/UserSearchEventsPage";
import UserEventsPage from "../pages/User/UserEventsPage";

export const userRoutes = [
    {
        path: EVENTS_ROUTE,
        Component: UserSearchEventsPage,
    },
    {
        path: USER_EVENT_DETAILS_ROUTE,
        Component: UserEventDetailsPage,
    },
    {
        path: USER_EVENTS_ROUTE,
        Component: UserEventsPage,
    },
    {
        path: SPECIFIC_COMPANY_PROFILE_ROUTE,
        Component: CompanyProfilePage,
    },
    {
        path: SPECIFIC_USER_PROFILE_ROUTE,
        Component: UserProfilePage,
    },
    {
        path: USER_PROFILE_ROUTE,
        Component: UserProfilePage,
    },
];

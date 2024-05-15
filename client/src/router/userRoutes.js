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

export const userRoutes = [
    // TODO implement.
    // {
    //     path: EVENTS_ROUTE,
    //     Component: AvailableEventsPage,
    // },
    // TODO implement.
    // {
    //     path: USER_EVENT_DETAILS_ROUTE,
    //     Component: UserEventDetails,
    // },
    // TODO implement.
    // {
    //     path: USER_EVENTS_ROUTE,
    //     Component: UserEventsPage,
    // },
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

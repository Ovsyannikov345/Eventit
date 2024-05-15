import LoginPage from "../pages/LoginPage";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: LoginPage,
    },
    // TODO implement.
    // {
    //     path: REGISTRATION_ROUTE,
    //     Component: RegistrationPage,
    // },
];
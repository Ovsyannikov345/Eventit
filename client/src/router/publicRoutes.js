import LoginPage from "../pages/LoginPage";
import RegistrationPage from "../pages/RegistrationPage";
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: LoginPage,
    },
    {
        path: REGISTRATION_ROUTE,
        Component: RegistrationPage,
    },
];
import LoginPage from "../components/pages/LoginPage";
import RegistrationPage from "../components/pages/RegistrationPage";

export const publicRoutes = [
    {
        path: "/login",
        Component: LoginPage,
    },
    {
        path: "/register",
        Component: RegistrationPage,
    },
];
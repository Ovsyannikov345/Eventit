import CompanyProfilePage from "../components/pages/Company/CompanyProfilePage";
import AvailableOrdersPage from "../components/pages/User/AvailableOrdersPage";
import OrdersInProgressPage from "../components/pages/User/OrdersInProgressPage";
import UserOrderDetails from "../components/pages/User/UserOrderDetails";
import UserProfilePage from "../components/pages/User/UserProfilePage";

export const userRoutes = [
    {
        path: "/orders",
        Component: AvailableOrdersPage,
    },
    {
        path: "/orders/:id",
        Component: UserOrderDetails,
    },
    {
        path: "/my-orders",
        Component: OrdersInProgressPage,
    },
    {
        path: "/company/:id",
        Component: CompanyProfilePage,
    },
    {
        path: "/user/:id",
        Component: UserProfilePage,
    },
    {
        path: "/user",
        Component: UserProfilePage,
    },
];
import CreateOrderPage from "../components/pages/Company/CreateEventPage";
import CompanyProfilePage from "../components/pages/Company/CompanyProfilePage";
import MyOrdersPage from "../components/pages/Company/MyOrdersPage";
import CompanyOrderDetails from "../components/pages/Company/CompanyOrderDetails";
import UserProfilePage from '../components/pages/User/UserProfilePage';

export const companyRoutes = [
    {
        path: "/my-orders",
        Component: MyOrdersPage,
    },
    {
        path: "/my-orders/:id",
        Component: CompanyOrderDetails,
    },
    {
        path: "/user/:id",
        Component: UserProfilePage,
    },
    {
        path: "/orders/create",
        Component: CreateOrderPage,
    },
    {
        path: "/company/:id",
        Component: CompanyProfilePage,
    },
    {
        path: "/company",
        Component: CompanyProfilePage,
    },
];
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { userRoutes } from "./userRoutes";
import { companyRoutes } from "./companyRoutes";
import { LOGIN_ROUTE, COMPANY_DEFAULT_ROUTE, USER_DEFAULT_ROUTE } from "../utils/consts";

const AppRouter = () => {
    const [token, setToken] = useState(localStorage.getItem("accessToken"));
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("accessToken"));
            navigate("/");
        };

        window.addEventListener("storage", handleStorageChange);
    }, [navigate]);

    if (token && localStorage.getItem("role") === "user") {
        return (
            <Routes>
                {userRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
                <Route key="*" path="*" element={<Navigate to={USER_DEFAULT_ROUTE} />} />
            </Routes>
        );
    }

    if (token && localStorage.getItem("role") === "company") {
        return (
            <Routes>
                {companyRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
                <Route key="*" path="*" element={<Navigate to={COMPANY_DEFAULT_ROUTE} />} />
            </Routes>
        );
    }

    if (!token) {
        return (
            <Routes>
                {publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} exact />
                ))}
                <Route key="*" path="*" element={<Navigate to={LOGIN_ROUTE} />} />
            </Routes>
        );
    }
};

export default AppRouter;

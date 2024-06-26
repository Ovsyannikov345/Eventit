import React, { useState } from "react";
import { Grid, Snackbar, Alert } from "@mui/material";
import LoginBackground from "../img/login_background.png";
import { useNavigate } from "react-router-dom";
import TypeSelectForm from "../components/forms/registration/TypeSelectForm";
import AuthDataForm from "../components/forms/registration/AuthDataForm";
import CompanyPersonalDataForm from "../components/forms/registration/CompanyPersonalDataForm";
import UserPersonalDataForm from "../components/forms/registration/UserPersonalDataForm";
import LoadingModal from "../components/modals/LoadingModal";
import { registerUser } from "../api/usersApi";
import { login } from "../api/authApi";
import { registerCompany } from "../api/companiesApi";

const RegistrationPage = () => {
    const [isLoading, setIsLoading] = useState(false);

    const [accountType, setAccountType] = useState("");
    const [authData, setAuthData] = useState(null);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const displayError = (message) => {
        setErrorMessage(message);
        setError(true);
    };

    const closeSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setError(false);
    };

    const register = async (personalData) => {
        setIsLoading(true);

        console.log({...authData, ...personalData});

        if (accountType === "user") {
            const response = await registerUser({
                ...authData,
                ...personalData,
            });

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                setIsLoading(false);
                return;
            }

            const loginResponse = await login(authData.email, authData.password);

            if (!loginResponse.status || loginResponse.status >= 300) {
                navigate("/login");
                setIsLoading(false);
                return;
            }

            localStorage.setItem("accessToken", loginResponse.data.accessToken);
            localStorage.setItem("refreshToken", loginResponse.data.refreshToken);
            localStorage.setItem("role", loginResponse.data.role);
            localStorage.setItem("id", loginResponse.data.id);
            window.location.reload();
        }

        if (accountType === "company") {
            const response = await registerCompany({
                ...authData,
                ...personalData,
            });

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                setIsLoading(false);
                return;
            }

            const loginResponse = await login(authData.email, authData.password);

            if (!loginResponse.status || loginResponse.status >= 300) {
                navigate("/login");
                setIsLoading(false);
                return;
            }

            localStorage.setItem("accessToken", loginResponse.data.accessToken);
            localStorage.setItem("refreshToken", loginResponse.data.refreshToken);
            localStorage.setItem("role", loginResponse.data.role);
            localStorage.setItem("id", loginResponse.data.id);
            window.location.reload();
        }
    };

    return (
        <>
            <LoadingModal isOpen={isLoading} />
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%", backgroundImage: `url(${LoginBackground})`, backgroundSize: "cover" }}
            >
                {!accountType ? (
                    <TypeSelectForm setAccountType={setAccountType} />
                ) : !authData ? (
                    <AuthDataForm setAuthData={setAuthData} />
                ) : accountType === "user" ? (
                    <UserPersonalDataForm finishRegistration={register} />
                ) : (
                    <CompanyPersonalDataForm finishRegistration={register}/>
                )}
                <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Grid>
        </>
    );
};

export default RegistrationPage;

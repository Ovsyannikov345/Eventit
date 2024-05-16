import React, { useState } from "react";
import { Grid, Snackbar, Alert } from "@mui/material";
import LoginBackground from "../img/login_background.png";
import { useNavigate } from "react-router-dom";
import TypeSelectForm from "../components/forms/registration/TypeSelectForm";
import AuthDataForm from "../components/forms/registration/AuthDataForm";
import CompanyPersonalDataForm from "../components/forms/registration/CompanyPersonalDataForm";
import UserPersonalDataForm from "../components/forms/registration/UserPersonalDataForm";

const RegistrationPage = () => {
    const [accountType, setAccountType] = useState("");
    const [authData, setAuthData] = useState(null);
    const [personalData, setPersonalData] = useState(null);

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

    return (
        <>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%", backgroundImage: `url(${LoginBackground})`, backgroundSize: "cover" }}
            >
                {!accountType ? (
                    <TypeSelectForm setAccountType={setAccountType}/>
                ) : !authData ? (
                    <AuthDataForm setAuthData={setAuthData}/>
                ) : accountType === "user" ? (
                    <UserPersonalDataForm />
                ) : (
                    <CompanyPersonalDataForm />
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

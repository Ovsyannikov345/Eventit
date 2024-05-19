import React, { useState } from "react";
import { AppBar, Toolbar, Button, IconButton, Grid, Snackbar, Alert } from "@mui/material";
import Logo from "../../img/logo.png";
import SearchIcon from "@mui/icons-material/Search";
import EventIcon from "@mui/icons-material/Event";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";
import styled from "styled-components";
import SupportRequestModal from "../modals/SupportRequestModal";

const LogoContainer = styled.div`
    width: 120px;
    height: 55px;
    border-radius: 10px;
    overflow: hidden;
`;

const StyledLogo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const Navigation = styled.div`
    flex: 1;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-evenly;
`;

const Activity = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
`;

const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("id");
    window.location.reload();
};

const UserHeader = () => {
    const [supportRequestModalOpen, setSupportRequestModalOpen] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const displayError = (message) => {
        setErrorMessage(message);
        setError(true);
    };

    const displaySuccess = (message) => {
        setSuccessMessage(message);
        setSuccess(true);
    };

    const closeSnackbar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setSuccess(false);
        setError(false);
    };

    return (
        <>
            <SupportRequestModal
                isOpen={supportRequestModalOpen}
                onClose={() => setSupportRequestModalOpen(false)}
                displaySuccess={displaySuccess}
                displayError={displayError}
            />
            <AppBar position="fixed" sx={{ flexDirection: "row", justifyContent: "center" }}>
                <Toolbar sx={{ justifyContent: "space-between", width: "100%", maxWidth: "1300px" }}>
                    <LogoContainer>
                        <StyledLogo src={Logo} alt="Logo" />
                    </LogoContainer>
                    <Navigation>
                        <Grid container gap={"10px"} ml={"20px"}>
                            {/* TODO implement */}
                            <Button
                                color="inherit"
                                startIcon={<SearchIcon />}
                                sx={{ borderBottom: "1px solid #555", borderRadius: "0px" }}
                            >
                                Поиск мероприятия
                            </Button>
                            {/* TODO implement */}
                            <Button
                                color="inherit"
                                startIcon={<EventIcon />}
                                sx={{ borderBottom: "1px solid #555", borderRadius: "0px" }}
                            >
                                Ваши мероприятия
                            </Button>
                        </Grid>
                    </Navigation>
                    <Activity>
                        {/* TODO implement */}
                        <IconButton color="inherit" title="Уведомления" sx={{ fontSize: "30px" }}>
                            <NotificationsIcon fontSize="20px" />
                        </IconButton>
                        {/* TODO implement */}
                        <IconButton color="inherit" title="Профиль" sx={{ fontSize: "30px" }}>
                            <AccountCircleIcon fontSize="20px" />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            title="Техническая поддержка"
                            sx={{ fontSize: "30px" }}
                            onClick={() => setSupportRequestModalOpen(true)}
                        >
                            <SupportIcon fontSize="20px" />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            title="Выход"
                            sx={{ fontSize: "35px" }}
                            onClick={handleLogout}
                        >
                            <LogoutIcon fontSize="20px" />
                        </IconButton>
                    </Activity>
                </Toolbar>
            </AppBar>
            <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={success} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="success" sx={{ width: "100%" }}>
                    {successMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default UserHeader;

import React, { useState } from "react";
import { AppBar, Toolbar, Button, IconButton, Grid, Snackbar, Alert, Menu } from "@mui/material";
import Logo from "../../img/logo.png";
import CreateIcon from "@mui/icons-material/AddBox";
import EventIcon from "@mui/icons-material/Event";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";
import styled from "styled-components";
import SupportRequestModal from "../modals/SupportRequestModal";
import { useNavigate } from "react-router-dom";
import { COMPANY_EVENTS_ROUTE, COMPANY_PROFILE_ROUTE, EVENT_CREATION_ROUTE } from "../../utils/consts";
import NotificationTabs from "../modals/NotificationsModal/NotificationTabs";

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

const CompanyHeader = () => {
    const navigate = useNavigate();

    const [supportRequestModalOpen, setSupportRequestModalOpen] = useState(false);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setNotificationAnchorEl(null);
    };

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
                            <Button
                                color="inherit"
                                startIcon={<CreateIcon />}
                                sx={{ borderBottom: "1px solid #555", borderRadius: "0px" }}
                                onClick={() => navigate(EVENT_CREATION_ROUTE)}
                            >
                                Создать мероприятие
                            </Button>
                            <Button
                                color="inherit"
                                startIcon={<EventIcon />}
                                sx={{ borderBottom: "1px solid #555", borderRadius: "0px" }}
                                onClick={() => navigate(COMPANY_EVENTS_ROUTE)}
                            >
                                Ваши мероприятия
                            </Button>
                        </Grid>
                    </Navigation>
                    <Activity>
                        <IconButton
                            color="inherit"
                            title="Уведомления"
                            sx={{ fontSize: "30px" }}
                            onClick={handleMenuOpen}
                        >
                            <NotificationsIcon fontSize="20px" />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            title="Профиль"
                            sx={{ fontSize: "30px" }}
                            onClick={() => navigate(COMPANY_PROFILE_ROUTE)}
                        >
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
                            sx={{ fontSize: "30px" }}
                            onClick={handleLogout}
                        >
                            <LogoutIcon fontSize="20px" />
                        </IconButton>
                    </Activity>
                    <Menu
                        anchorEl={notificationAnchorEl}
                        open={Boolean(notificationAnchorEl)}
                        onClose={handleMenuClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        PaperProps={{
                            style: {
                                width: 450,
                            },
                        }}
                    >
                        <NotificationTabs displayError={displayError} />
                    </Menu>
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

export default CompanyHeader;

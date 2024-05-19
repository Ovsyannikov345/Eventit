import React from "react";
import { AppBar, Toolbar, Button, IconButton, Grid } from "@mui/material";
import Logo from "../../img/logo.png";
import CreateIcon from "@mui/icons-material/AddBox";
import EventIcon from "@mui/icons-material/Event";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SupportIcon from "@mui/icons-material/Support";
import LogoutIcon from "@mui/icons-material/Logout";
import styled from "styled-components";

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
    return (
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
                            startIcon={<CreateIcon />}
                            sx={{ borderBottom: "1px solid #555", borderRadius: "0px" }}
                        >
                            Создать мероприятие
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
                    {/* TODO implement */}
                    <IconButton color="inherit" title="Техническая поддержка" sx={{ fontSize: "30px" }}>
                        <SupportIcon fontSize="20px" />
                    </IconButton>
                    <IconButton color="inherit" title="Выход" sx={{ fontSize: "30px" }} onClick={handleLogout}>
                        <LogoutIcon fontSize="20px" />
                    </IconButton>
                </Activity>
            </Toolbar>
        </AppBar>
    );
};

export default CompanyHeader;

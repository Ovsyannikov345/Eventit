import React from 'react';
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from '../../img/logo.png';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupportIcon from '@mui/icons-material/Support';
import styled from 'styled-components';

// TODO useTheme();
const theme = createTheme({
  palette: {
    primary: {
      main: '#729CDB',
    },
  },
});

const LogoContainer = styled.div`
  width: 100px;
  height: 35px;
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
  width: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CompanyHeader = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed">
        <Toolbar>
          <LogoContainer>
            <StyledLogo src={Logo} alt="Logo" />
          </LogoContainer>
          <Navigation>
            <Button color="inherit">Создать мероприятие</Button>
            <Button color="inherit">Ваши мероприятия</Button>
          </Navigation>
          <Activity>
            <IconButton color="inherit" title="Уведомления">
              <NotificationsIcon />
            </IconButton>
            <IconButton color="inherit" title="Профиль">
              <AccountCircleIcon />
            </IconButton>
            <IconButton color="inherit" title="Техническая поддержка">
              <SupportIcon />
            </IconButton>
          </Activity>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default CompanyHeader;
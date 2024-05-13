import { ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import CreateEventPage from "./components/pages/Company/CreateEventPage";

const App = () => {
    // TODO set correct values.
    const theme = createTheme({
        palette: {
            primary: {
                main: "#DDC12C",
            },
            text: {
                main: "#000000",
            },
        },
        typography: {
            h1: {
                fontSize: "36px",
            },
            h2: {
                fontSize: "24px",
            },
            h3: {
                fontSize: "16px",
            },
        },
        breakpoints: {
            values: {
                xs: 0,
                sm: 320,
                md: 768,
                lg: 1200,
                xl: 1536,
            },
        },
    });

    return (
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <CreateEventPage />
                </BrowserRouter>
            </ThemeProvider>
        </LocalizationProvider>
    );
};

export default App;

import React, { useEffect, useState } from "react";
import {
    Typography,
    IconButton,
    Button,
    Container,
    TextField,
    Grid,
    FormControl,
    FormHelperText,
    InputLabel,
    Select,
    MenuItem,
    Tabs,
    Tab,
    Snackbar,
    Alert,
    OutlinedInput,
    Box,
    Chip,
} from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBackIos";
import {useNavigate, useParams} from "react-router-dom";
import {getEvent} from "../../api/eventsApi"
import moment from "moment";
import { useFormik } from "formik";

const UserEventDetailsPage = () => {
    const {id} = useParams();

    const navigate = useNavigate();

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

    const [event, setEvent] = useState(null);

    useEffect(() => {
        const loadEvent = async () => {
            const response = await getEvent(id);

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            // TODO remove.
            console.log(response.data);

            setEvent(response.data);
        }

        loadEvent();
    }, [id]);

    return (
        <>
            <IconButton
                color="primary"
                style={{ marginTop: 10, marginLeft: 10 }}
                onClick={() => navigate("/events")}
            >
                <BackIcon></BackIcon>Список мероприятий
            </IconButton>
            <Container>
                {/* TODO implement */}
            </Container>
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
    )
};

export default UserEventDetailsPage;

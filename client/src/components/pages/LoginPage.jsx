import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Snackbar, Alert } from "@mui/material";
import { useFormik } from "formik";

const LoginPage = () => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validate: ({ email, password }) => {
            const errors = {};

            if (!email) {
                errors.email = "Обязательное поле";
                displayError("Введите эл. почту");
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                errors.email = "Некорректный адрес";
                displayError("Некорректный адрес эл. почты");
            }

            if (!password) {
                errors.password = "Обязательное поле";
                displayError("Введите пароль");
            }

            return errors;
        },
        onSubmit: async ({ email, password }) => {
            //const response = await login
            console.log("submit");
            //await login(email, password);
        },
    });

    // const login = async (email, password) => {
    //     const response = await log(id);

    //     if (!response.status || response.status >= 300) {
    //         displayError(response.data.error);
    //         return;
    //     }

    //     if (response.status < 400) {
    //         localStorage.setItem("accessToken", response.data.accessToken);
    //         localStorage.setItem("refreshToken", response.data.refreshToken);
    //         localStorage.setItem("role", response.data.role);
    //         localStorage.setItem("userId", response.data.userId);
    //         window.location.reload();
    //     } else {
    //         displayError(response.data.error);
    //     }

    //     displayError("Сервис временно недоступен");
    // };

    return (
        <>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: "100px" }}>
                <Grid container item xs={12} sm={6} md={4} xl={3} gap={2} maxWidth={"480px"}>
                    <Typography variant="h4" width={"100%"} textAlign={"center"}>
                        Выполните вход
                    </Typography>
                    <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                        <TextField
                            id="email"
                            label="Эл.почта"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            id="password"
                            label="Пароль"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            style={{ marginTop: "20px" }}
                        >
                            Войти
                        </Button>
                    </form>
                </Grid>
                <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Grid>
        </>
    );
};

export default LoginPage;

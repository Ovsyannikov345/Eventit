import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Snackbar, Alert } from "@mui/material";
import { useFormik } from "formik";
import { login } from "../api/authApi";

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
                errors.email = "Введите эл. почту";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                errors.email = "Некорректный адрес";
            }

            if (!password) {
                errors.password = "Введите пароль";
            }

            return errors;
        },
        onSubmit: async ({ email, password }) => {
            const response = await login(email, password);

            if (response.status === 200) {
                localStorage.setItem("accessToken", response.data.accessToken);
                localStorage.setItem("refreshToken", response.data.refreshToken);
                localStorage.setItem("role", response.data.role);
                window.location.reload();
            }

            if (response.status === 401) {
                displayError("Неверные данные аккаунта");
                return;
            }

            displayError(response.data.error);
        },
    });

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
                            onChange={(e) => {
                                formik.setFieldTouched("email", false);
                                formik.handleChange(e);
                            }}
                            error={formik.touched.email && formik.errors.email !== undefined}
                            helperText={
                                formik.touched.email && formik.errors.email !== undefined
                                    ? formik.errors.email
                                    : ""
                            }
                        />
                        <TextField
                            id="password"
                            label="Пароль"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={formik.values.password}
                            onChange={(e) => {
                                formik.setFieldTouched("password", false);
                                formik.handleChange(e);
                            }}
                            error={formik.touched.password && formik.errors.password !== undefined}
                            helperText={
                                formik.touched.password && formik.errors.password !== undefined
                                    ? formik.errors.password
                                    : ""
                            }
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

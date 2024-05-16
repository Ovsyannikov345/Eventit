import React from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import InputMask from "react-input-mask";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import { useFormik } from "formik";
import Logo from "../../../img/logo.png";
import styled from "styled-components";

const LogoContainer = styled.div`
    width: 200px;
    height: 70px;
    border-radius: 10px;
    overflow: hidden;
`;

const StyledLogo = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`;

const UserPersonalDataForm = ({ finishRegistration }) => {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            patronymic: "",
            phoneNumber: "",
            dateOfBirth: "",
        },
        validate: ({ firstName, lastName, patronymic, phoneNumber, dateOfBirth }) => {
            const errors = {};

            if (!firstName) {
                errors.firstName = "Заполните поле";
            } else if (!/^[A-Za-zА-Яа-я]+$/i.test(firstName)) {
                errors.firstName = "Имя должно включать только буквы";
            } else if (firstName.length > 50) {
                errors.firstName = "Имя не должно превышать 50 символов";
            }

            if (!lastName) {
                errors.lastName = "Заполните поле";
            } else if (!/^[A-Za-zА-Яа-я]+$/i.test(lastName)) {
                errors.lastName = "Фамилия должна включать только буквы";
            } else if (lastName.length > 50) {
                errors.lastName = "Фамилия не должна превышать 50 символов";
            }

            if (patronymic) {
                if (!/^[A-Za-zА-Яа-я]+$/i.test(patronymic)) {
                    errors.patronymic = "Отчество должно включать только буквы";
                } else if (patronymic.length > 50) {
                    errors.patronymic = "Отчество не должно превышать 50 символов";
                }
            }

            if (!phoneNumber) {
                errors.phoneNumber = "Заполните поле";
            } else if (phoneNumber.includes("_")) {
                errors.phoneNumber = "Некорректное значение";
            }

            return errors;
        },
        onSubmit: async (userPersonalData) => {
            if (userPersonalData.dateOfBirth === "Invalid date" || userPersonalData.dateOfBirth === "") {
                userPersonalData.dateOfBirth = null;
            }

            if (userPersonalData.patronymic === "") {
                userPersonalData.patronymic = null;
            }

            finishRegistration(userPersonalData);
        },
    });

    return (
        <>
            <Grid
                container
                item
                xs={12}
                sm={6}
                md={4}
                xl={3}
                gap={2}
                maxWidth={"600px"}
                style={{ backgroundColor: "#FFFFFF", borderRadius: "15px", padding: "25px" }}
            >
                <Grid container item xs={12} justifyContent={"center"}>
                    <LogoContainer>
                        <StyledLogo src={Logo} alt="Logo" />
                    </LogoContainer>
                </Grid>
                <Typography variant="h5" width={"100%"} textAlign={"center"}>
                    Укажите личные данные
                </Typography>
                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        id="lastName"
                        label="Фамилия"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formik.values.lastName}
                        onChange={(e) => {
                            formik.setFieldTouched("lastName", false);
                            formik.handleChange(e);
                        }}
                        error={formik.touched.lastName && formik.errors.lastName !== undefined}
                        helperText={
                            formik.touched.lastName && formik.errors.lastName !== undefined
                                ? formik.errors.lastName
                                : ""
                        }
                    />
                    <TextField
                        id="firstName"
                        label="Имя"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formik.values.firstName}
                        onChange={(e) => {
                            formik.setFieldTouched("firstName", false);
                            formik.handleChange(e);
                        }}
                        error={formik.touched.firstName && formik.errors.firstName !== undefined}
                        helperText={
                            formik.touched.firstName && formik.errors.firstName !== undefined
                                ? formik.errors.firstName
                                : ""
                        }
                    />
                    <TextField
                        id="patronymic"
                        label="Отчество"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formik.values.patronymic}
                        onChange={(e) => {
                            formik.setFieldTouched("patronymic", false);
                            formik.handleChange(e);
                        }}
                        error={formik.touched.patronymic && formik.errors.patronymic !== undefined}
                        helperText={
                            formik.touched.patronymic && formik.errors.patronymic !== undefined
                                ? formik.errors.patronymic
                                : ""
                        }
                    />
                    <InputMask
                        mask="+375(99)999-99-99"
                        value={formik.values.phoneNumber}
                        onChange={(e) => {
                            formik.setFieldTouched("phoneNumber", false);
                            formik.handleChange(e);
                        }}
                    >
                        {() => (
                            <TextField
                                id="phoneNumber"
                                name="phoneNumber"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                label="Номер телефона"
                                value={formik.values.phoneNumber}
                                error={formik.touched.phoneNumber && formik.errors.phoneNumber !== undefined}
                                helperText={
                                    formik.touched.phoneNumber && formik.errors.phoneNumber !== undefined
                                        ? formik.errors.phoneNumber
                                        : ""
                                }
                            ></TextField>
                        )}
                    </InputMask>
                    <DatePicker
                        sx={{ width: "100%", marginTop: "16px" }}
                        label="Дата рождения"
                        disableFuture
                        maxDate={moment(new Date(new Date().setFullYear(new Date().getFullYear() - 14)))}
                        value={formik.values.dateOfBirth ? moment(formik.values.dateOfBirth) : null}
                        onChange={(newDate) => {
                            formik.setFieldValue("dateOfBirth", moment(newDate).format("YYYY-MM-DD"));
                            formik.setFieldTouched("dateOfBirth", false);
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: "20px", height: "50px", borderRadius: "15px" }}
                    >
                        Готово
                    </Button>
                </form>
            </Grid>
        </>
    );
};

export default UserPersonalDataForm;

import React from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";
import InputMask from "react-input-mask";
import { useFormik } from "formik";

const CompanyPersonalDataForm = ({ finishRegistration }) => {
    const formik = useFormik({
        initialValues: {
            name: "",
            registrationNumber: "",
            firstName: "",
            lastName: "",
            patronymic: "",
            phoneNumber: "",
            email: "",
        },
        validate: ({ name, registrationNumber, firstName, lastName, patronymic, phoneNumber, email }) => {
            const errors = {};

            if (!name) {
                errors.name = "Заполните поле";
            } else if (name.length > 255) {
                errors.name = "Имя не должно превышать 255 символов";
            }

            if (!registrationNumber) {
                errors.registrationNumber = "Заполните поле";
            } else if (!/^[A-Za-z0-9]+$/i.test(registrationNumber)) {
                errors.registrationNumber = "Недопустимые символы в номере (A-Za-z0-9)";
            } else if (registrationNumber.length > 50) {
                errors.registrationNumber = "Номер не должен превышать 50 символов";
            }

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

            if (!email) {
                errors.email = "Заполните поле";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
                errors.email = "Некорректный адрес";
            } else if (email.length > 100) {
                errors.email = "Почта не должна превышать 100 символов";
            }

            return errors;
        },
        onSubmit: async (companyPersonalData) => {
            if (companyPersonalData.patronymic === "") {
                companyPersonalData.patronymic = null;
            }

            finishRegistration({
                name: companyPersonalData.name,
                registrationNumber: companyPersonalData.registrationNumber,
                companyContactPerson: {
                    firstName: companyPersonalData.firstName,
                    lastName: companyPersonalData.lastName,
                    patronymic: companyPersonalData.patronymic,
                    phoneNumber: companyPersonalData.phoneNumber,
                    email: companyPersonalData.email,
                },
            });
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
                <Typography variant="h5" width={"100%"} textAlign={"center"}>
                    Укажите данные компании
                </Typography>
                <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
                    <TextField
                        id="name"
                        label="Название"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formik.values.name}
                        onChange={(e) => {
                            formik.setFieldTouched("name", false);
                            formik.handleChange(e);
                        }}
                        error={formik.touched.name && formik.errors.name !== undefined}
                        helperText={
                            formik.touched.name && formik.errors.name !== undefined ? formik.errors.name : ""
                        }
                    />
                    <TextField
                        id="registrationNumber"
                        label="Регистрационный номер"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={formik.values.registrationNumber}
                        onChange={(e) => {
                            formik.setFieldTouched("registrationNumber", false);
                            formik.handleChange(e);
                        }}
                        error={
                            formik.touched.registrationNumber && formik.errors.registrationNumber !== undefined
                        }
                        helperText={
                            formik.touched.registrationNumber && formik.errors.registrationNumber !== undefined
                                ? formik.errors.registrationNumber
                                : ""
                        }
                    />
                    <Typography variant="h6">Контактное лицо</Typography>
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
                            formik.touched.email && formik.errors.email !== undefined ? formik.errors.email : ""
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

export default CompanyPersonalDataForm;

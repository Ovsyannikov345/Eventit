import { Grid, Typography, TextField, Button } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import InputMask from "react-input-mask";
import validateCompanyData from "../../utils/validateCompanyData";

const CompanyEditForm = ({ companyData, cancelHandler, applyCallback }) => {
    const formik = useFormik({
        initialValues: {
            name: companyData.name,
            email:companyData.email,
            registrationNumber:companyData.registrationNumber,
            contactSurname: companyData.companyContactPerson.lastName,
            contactName: companyData.companyContactPerson.firstName,
            contactPatronymic: companyData.companyContactPerson.patronymic,
            contactEmail: companyData.companyContactPerson.email,
            contactPhone: companyData.companyContactPerson.phoneNumber,
        },
        validate: validateCompanyData,
        onSubmit: async (values) => {
            const updatedCompanyData = {
                id: companyData.id,
                registrationDate: companyData.registrationDate,
                name: values.name,
                email: values.email,
                registrationNumber:values.registrationNumber,
                companyContactPerson: {
                    id: companyData.companyContactPerson.id,
                    firstName: values.contactName,
                    lastName: values.contactSurname,
                    patronymic: values.contactPatronymic,
                    phoneNumber: values.contactPhone,
                    email: values.contactEmail,
                },
            };

            applyCallback(updatedCompanyData);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Grid
                container
                item
                flexDirection={"column"}
                mt={"20px"}
                gap={"20px"}
                maxWidth={"768px"}
                sx={{
                    width: { xs: "312px", md: "661px", lg: "768px" },
                    paddingLeft: { xs: "10px", md: "46px", lg: 0 },
                }}
            >
                <Typography variant="h4" height={"69px"} display={"flex"} alignItems={"center"}>
                    Данные компании
                </Typography>
                <Grid container item maxWidth={"768px"} columnGap={"10px"} rowGap={"20px"}>
                <Grid container item maxWidth={"246px"}>
                    <TextField
                        id="name"
                        name="name"
                        fullWidth
                        variant="outlined"
                        label="Название"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && formik.errors.name !== undefined}
                        helperText={
                            formik.touched.name && formik.errors.name !== undefined ? formik.errors.name : ""
                        }
                        required
                    ></TextField>
                    </Grid>
                    <Grid container item maxWidth={"246px"}>
                    <TextField
                        id="email"
                        name="email"
                        fullWidth
                        variant="outlined"
                        label="Эл. почта"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && formik.errors.email !== undefined}
                        helperText={
                            formik.touched.email && formik.errors.email !== undefined
                                ? formik.errors.email
                                : ""
                        }
                        required
                    ></TextField>
                    </Grid>
                    <Grid container item maxWidth={"246px"}>
                    <TextField
                        id="registrationNumber"
                        name="registrationNumber"
                        fullWidth
                        variant="outlined"
                        label="Регистрационный номер"
                        value={formik.values.registrationNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.registrationNumber && formik.errors.registrationNumber !== undefined}
                        helperText={
                            formik.touched.registrationNumber && formik.errors.registrationNumber !== undefined ? formik.errors.registrationNumber : ""
                        }
                        required
                    ></TextField>
                    </Grid>
                </Grid>
                <Typography variant="h4" height={"69px"} display={"flex"} alignItems={"center"}>
                    Данные контактного лица
                </Typography>
                <Grid container item maxWidth={"768px"} columnGap={"10px"} rowGap={"20px"}>
                    <Grid container item maxWidth={"246px"}>
                        <TextField
                            id="contactSurname"
                            name="contactSurname"
                            fullWidth
                            variant="outlined"
                            label="Фамилия"
                            value={formik.values.contactSurname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.contactSurname && formik.errors.contactSurname !== undefined}
                            helperText={
                                formik.touched.contactSurname && formik.errors.contactSurname !== undefined
                                    ? formik.errors.contactSurname
                                    : ""
                            }
                            required
                        ></TextField>
                    </Grid>
                    <Grid container item maxWidth={"246px"}>
                        <TextField
                            id="contactName"
                            name="contactName"
                            fullWidth
                            variant="outlined"
                            label="Имя"
                            value={formik.values.contactName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.contactName && formik.errors.contactName !== undefined}
                            helperText={
                                formik.touched.contactName && formik.errors.contactName !== undefined
                                    ? formik.errors.contactName
                                    : ""
                            }
                            required
                        ></TextField>
                    </Grid>
                    <Grid container item maxWidth={"246px"}>
                        <TextField
                            id="contactPatronymic"
                            name="contactPatronymic"
                            fullWidth
                            variant="outlined"
                            label="Отчество"
                            value={formik.values.contactPatronymic}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.contactPatronymic && formik.errors.contactPatronymic !== undefined
                            }
                            helperText={
                                formik.touched.contactPatronymic && formik.errors.contactPatronymic !== undefined
                                    ? formik.errors.contactPatronymic
                                    : ""
                            }
                        ></TextField>
                    </Grid>
                </Grid>
                <Grid container item rowGap={"20px"} columnGap={"15px"}>
                    <Grid container item maxWidth={"300px"}>
                        <TextField
                            id="contactEmail"
                            name="contactEmail"
                            fullWidth
                            variant="outlined"
                            label="Эл. почта"
                            value={formik.values.contactEmail}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.contactEmail && formik.errors.contactEmail !== undefined}
                            helperText={
                                formik.touched.contactEmail && formik.errors.contactEmail !== undefined
                                    ? formik.errors.contactEmail
                                    : ""
                            }
                            required
                        ></TextField>
                    </Grid>
                    <Grid container item maxWidth={"300px"}>
                        <InputMask
                            mask="+375(99)999-99-99"
                            value={formik.values.contactPhone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        >
                            {() => (
                                <TextField
                                    id="contactPhone"
                                    name="contactPhone"
                                    fullWidth
                                    variant="outlined"
                                    label="Телефон"
                                    value={formik.values.contactPhone}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched.contactPhone && formik.errors.contactPhone !== undefined
                                    }
                                    helperText={
                                        formik.touched.contactPhone && formik.errors.contactPhone !== undefined
                                            ? formik.errors.contactPhone
                                            : ""
                                    }
                                    required
                                ></TextField>
                            )}
                        </InputMask>
                        </Grid>
                </Grid>
                <Grid container item columnGap={"15px"}>
                    <Grid container item maxWidth={"136px"}>
                        <Button type="submit" variant="contained">
                            СОХРАНИТЬ
                        </Button>
                    </Grid>
                    <Grid container item maxWidth={"108px"}>
                        <Button variant="outlined" onClick={() => cancelHandler()}>
                            ОТМЕНА
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </form>
    );
};

export default CompanyEditForm;
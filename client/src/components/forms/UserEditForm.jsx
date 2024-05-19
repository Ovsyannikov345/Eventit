import React from "react";
import { Grid, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import validateUserEditData from "../../utils/validateUserEditData";
import moment from "moment";

const UserEditForm = ({ userData, cancelHandler, applyCallback }) => {
    const formik = useFormik({
        initialValues: {
            lastName: userData.lastName,
            firstName: userData.firstName,
            patronymic: userData.patronymic,
            dateOfBirth: userData.dateOfBirth,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            description: userData.description,
        },
        validate: validateUserEditData,
        onSubmit: async (values) => {
            const updatedUserData = {
                id: userData.id,
                lastName: values.lastName,
                firstName: values.firstName,
                registrationDate: userData.registrationDate,
                patronymic: values.patronymic !== "" ? values.patronymic : null,
                dateOfBirth: values.dateOfBirth !== "" ? values.dateOfBirth : null,
                email: values.email !== "" ? values.email : null,
                phoneNumber: values.phoneNumber !== "" ? values.phoneNumber : null,
                description: values.description !== "" ? values.description : null,
            };

            applyCallback(updatedUserData);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
            <Grid
                container
                item
                flexDirection={"column"}
                mt={"20px"}
                gap={"10px"}
                sx={{
                    width: { xs: "290px", md: "570px", lg: "768px" },
                    paddingLeft: { xs: "31px", md: "46px", lg: 0 },
                }}
            >
                <Typography variant="h5" height={"69px"} display={"flex"} alignItems={"center"}>
                    Данные профиля
                </Typography>
                <Grid container item maxWidth={"768px"} columnGap={"15px"} rowGap={"20px"}>
                    <Grid container item sx={{ maxWidth: { xs: "259px", md: "246px" } }}>
                        <TextField
                            id="lastName"
                            name="lastName"
                            fullWidth
                            variant="outlined"
                            label="Фамилия"
                            value={formik.values.lastName ?? ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && formik.errors.lastName !== undefined}
                            helperText={
                                formik.touched.lastName && formik.errors.lastName !== undefined
                                    ? formik.errors.lastName
                                    : ""
                            }
                            required
                        ></TextField>
                    </Grid>
                    <Grid container item sx={{ maxWidth: { xs: "259px", md: "246px" } }}>
                        <TextField
                            id="firstName"
                            name="firstName"
                            fullWidth
                            variant="outlined"
                            label="Имя"
                            value={formik.values.firstName ?? ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && formik.errors.firstName !== undefined}
                            helperText={
                                formik.touched.firstName && formik.errors.firstName !== undefined ? formik.errors.firstName : ""
                            }
                            required
                        ></TextField>
                    </Grid>
                    <Grid container item sx={{ maxWidth: { xs: "259px", md: "246px" } }}>
                        <TextField
                            id="patronymic"
                            name="patronymic"
                            fullWidth
                            variant="outlined"
                            label="Отчество"
                            value={formik.values.patronymic ?? ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.patronymic && formik.errors.patronymic !== undefined}
                            helperText={
                                formik.touched.patronymic && formik.errors.patronymic !== undefined
                                    ? formik.errors.patronymic
                                    : ""
                            }
                        ></TextField>
                    </Grid>
                    <Grid container item sx={{ maxWidth: { xs: "259px", md: "246px" } }}>
                        <TextField
                            id="dateOfBirth"
                            name="dateOfBirth"
                            fullWidth
                            variant="outlined"
                            label="Дата рождения"
                            value={formik.values.dateOfBirth ? moment(formik.values.dateOfBirth).format('YYYY-MM-DD') : ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.dateOfBirth && formik.errors.dateOfBirth !== undefined}
                            helperText={
                                formik.touched.dateOfBirth && formik.errors.dateOfBirth !== undefined ? formik.errors.dateOfBirth : ""
                            }
                        ></TextField>
                    </Grid>
                    <Grid container item sx={{ maxWidth: { xs: "259px", md: "246px" } }}>
                        <TextField
                            id="email"
                            name="email"
                            fullWidth
                            variant="outlined"
                            label="Эл. почта"
                            value={formik.values.email ?? ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && formik.errors.email !== undefined}
                            helperText={
                                formik.touched.email && formik.errors.email !== undefined ? formik.errors.email : ""
                            }
                        ></TextField>
                    </Grid>
                    <Grid container item sx={{ maxWidth: { xs: "259px", md: "246px" } }}>
                        <TextField
                            id="phoneNumber"
                            name="phoneNumber"
                            fullWidth
                            variant="outlined"
                            label="Телефон"
                            value={formik.values.phoneNumber ?? ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phoneNumber && formik.errors.phoneNumber !== undefined}
                            helperText={
                                formik.touched.phoneNumber && formik.errors.phoneNumber !== undefined ? formik.errors.phoneNumber : ""
                            }
                        ></TextField>
                    </Grid>
                    <Grid container item sx={{ maxWidth: { xs: "259px", md: "507px" } }}>
                        <TextField
                            id="description"
                            name="description"
                            fullWidth
                            variant="outlined"
                            multiline
                            maxRows={10}
                            label="Описание"
                            value={formik.values.description ?? ""}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.description && formik.errors.description !== undefined}
                            helperText={
                                formik.touched.description && formik.errors.description !== undefined
                                    ? formik.errors.description
                                    : ""
                            }
                        ></TextField>
                    </Grid>
                    <Grid container item gap={"15px"}>
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
            </Grid>
        </form>
    );
};

export default UserEditForm;
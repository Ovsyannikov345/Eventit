import React, { useEffect, useMemo, useState } from "react";
import { Avatar, Grid, IconButton, TextField, Typography, Alert, Snackbar, Button } from "@mui/material";
import CompanyHeader from "../../components/headers/СompanyHeader";
import UserHeader from "../../components/headers/UserHeader";
import NavigateBack from "../../components/NavigateBack";
import EditIcon from "@mui/icons-material/EditOutlined";
import { styled } from "@mui/material/styles";
import moment from "moment";
import ProfileCards from "../../components/ProfileCards";
import {
    getCompanyReviews,
    getCompanyProfile,
    getCompany,
    putCompany,
    updateAvatar,
} from "../../api/companiesApi";
import { useTheme } from "@emotion/react";
import CompanyReview from "../../components/CompanyReview";
import CompanyEditForm from "../../components/forms/CompanyEditForm";
import { useParams } from "react-router-dom";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const CompanyProfilePage = () => {
    const theme = useTheme();

    const { id } = useParams();

    const [readonly, setReadonly] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [companyData, setCompanyData] = useState({});

    const [image, setImage] = useState(undefined);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [companyReviews, setCompanyReviews] = useState();

    useEffect(() => {
        var companyId;

        const loadCompanyData = async () => {
            const response = id !== undefined ? await getCompany(id) : await getCompanyProfile();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            companyId = response.data.id;
            setCompanyData(response.data);
            setReadonly(id !== undefined);
        };

        const loadCompanyReviews = async () => {
            const response = await getCompanyReviews(companyId);

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setCompanyReviews(response.data);
        };

        const loadData = async () => {
            await loadCompanyData();
            await loadCompanyReviews();
        };

        loadData();
    }, [id]);

    const rating = useMemo(() => {
        if (!companyReviews || companyReviews.length === 0) {
            return null;
        }

        var sum = 0;

        var count = 0;

        companyReviews.forEach((review) => {
            sum += review.grade;
            count++;
        });

        return Number.parseFloat((sum / count).toFixed(2));
    }, [companyReviews]);

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

    const applyChanges = async (updatedCompanyData) => {
        const response = await putCompany(updatedCompanyData);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        const imageSuccess = await sendImage();

        if (imageSuccess) {
            setCompanyData(response.data);
            setEditMode(false);
            window.location.reload();
        }
    };

    const sendImage = async () => {
        if (image === undefined) {
            return true;
        }

        const response = await updateAvatar(companyData.id, image);

        if (!response) {
            displayError("Сервис временно недоступен");
            return false;
        }

        if (response.status === 401) {
            window.location.reload();
        }

        if (response.status >= 300) {
            displayError("Ошибка при отправке изображения.");
            return false;
        }

        setImage(undefined);

        return true;
    };

    return (
        <Grid
            container
            width={"100%"}
            minHeight={"100vh"}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            style={{ backgroundImage: "linear-gradient(#204276, #729CDB)" }}
        >
            {localStorage.getItem("role") === "company" ? <CompanyHeader /> : <UserHeader />}
            <Grid
                container
                item
                flexDirection={"column"}
                alignItems={"flex-start"}
                maxWidth={"1300px"}
                flexGrow={1}
                bgcolor={"#FFFFFF"}
                marginTop={"5vh"}
            >
                <Grid
                    container
                    item
                    justifyContent={"space-between"}
                    flexWrap={"nowrap"}
                    sx={{
                        paddingLeft: { xs: "23px", lg: "40px" },
                        paddingRight: { xs: "23px", lg: "40px" },
                        marginTop: { xs: "0", md: "40px" },
                    }}
                >
                    <NavigateBack
                        label={id === undefined ? "Главная" : "Назад"}
                        to={id === undefined ? "/my-events" : -1}
                    />
                    {!readonly && !editMode && companyData.id !== undefined && (
                        <IconButton style={{ padding: 0, color: "#000000" }} onClick={() => setEditMode(true)}>
                            <EditIcon sx={{ fontSize: { xs: 30, md: 40, lg: 30 } }}></EditIcon>
                        </IconButton>
                    )}
                </Grid>
                <Grid
                    container
                    item
                    pb={"46px"}
                    sx={{
                        paddingLeft: { xs: "1px", md: "33px", lg: "150px" },
                        marginTop: { xs: "0", md: "40px" },
                    }}
                >
                    <Grid container item alignItems={"center"} sx={{ gap: { xs: "5px", md: "50px" } }}>
                        <Avatar
                            src={
                                companyData.id !== undefined
                                    ? `http://localhost:5000/api/Companies/${companyData.id}/avatar`
                                    : ""
                            }
                            variant="square"
                            sx={{
                                width: { xs: 60, md: 130 },
                                height: { xs: 60, md: 130 },
                                marginLeft: { xs: editMode ? "43px" : "0", md: "46px", lg: 0 },
                            }}
                        />
                        {!editMode ? (
                            <Grid
                                flexDirection={"column"}
                                gap={"10px"}
                                sx={{ maxWidth: { xs: "253px", md: "430px" } }}
                            >
                                <Typography variant="h4" height={"40px"}>
                                    {companyData.name}
                                </Typography>
                                <Typography variant="h6">{companyData.email}</Typography>
                            </Grid>
                        ) : (
                            <Button component="label" variant="outlined">
                                {image !== undefined ? image.name : "ВЫБРАТЬ ФАЙЛ"}
                                <VisuallyHiddenInput
                                    type="file"
                                    name="avatar"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    accept="image/png"
                                />
                            </Button>
                        )}
                    </Grid>
                    {!editMode ? (
                        <>
                            {
                                <ProfileCards
                                    registrationDate={
                                        companyData.registrationDate !== undefined
                                            ? moment.utc(companyData.registrationDate).format("DD-MM-YYYY")
                                            : "-"
                                    }
                                    eventsCount={companyData.eventsCount}
                                    rating={rating}
                                />
                            }
                            {companyData.companyContactPerson !== undefined ? (
                                <Grid
                                    container
                                    item
                                    flexDirection={"column"}
                                    sx={{
                                        paddingLeft: { xs: "1px", md: "46px", lg: "0px" },
                                        marginTop: { xs: "10px", md: "50px" },
                                    }}
                                >
                                    <TextField
                                        variant="standard"
                                        label="Регистарционный номер"
                                        value={companyData.registrationNumber}
                                        InputProps={{
                                            readOnly: true,
                                            sx: { fontSize: { xs: "20px", md: "24px" } },
                                        }}
                                        sx={{
                                            maxWidth: "394px",
                                            marginBottom: "3vh",
                                            "& .MuiInput-underline:before": {
                                                borderBottomColor: theme.palette.primary.main,
                                            },
                                            "& .MuiInput-underline:after": {
                                                borderBottomColor: theme.palette.primary.main,
                                            },
                                        }}
                                    />
                                    <Typography
                                        variant="h5"
                                        height={"69px"}
                                        display={"flex"}
                                        alignItems={"center"}
                                    >
                                        Контактная информация
                                    </Typography>
                                    <Grid container item flexDirection={"column"} gap={"25px"} maxWidth={"394px"}>
                                        <TextField
                                            variant="standard"
                                            label="ФИО контактного лица"
                                            value={[
                                                companyData.companyContactPerson.firstName,
                                                companyData.companyContactPerson.lastName,
                                                companyData.companyContactPerson.patronymic,
                                            ].join(" ")}
                                            InputProps={{
                                                readOnly: true,
                                                sx: { fontSize: { xs: "20px", md: "24px" } },
                                            }}
                                            sx={{
                                                "& .MuiInput-underline:before": {
                                                    borderBottomColor: theme.palette.primary.main,
                                                },
                                                "& .MuiInput-underline:after": {
                                                    borderBottomColor: theme.palette.primary.main,
                                                },
                                            }}
                                        />
                                        <TextField
                                            variant="standard"
                                            label="Эл. почта"
                                            value={companyData.companyContactPerson.email}
                                            InputProps={{
                                                readOnly: true,
                                                sx: { fontSize: { xs: "20px", md: "24px" } },
                                            }}
                                            sx={{
                                                "& .MuiInput-underline:before": {
                                                    borderBottomColor: theme.palette.primary.main,
                                                },
                                                "& .MuiInput-underline:after": {
                                                    borderBottomColor: theme.palette.primary.main,
                                                },
                                            }}
                                        />
                                        <TextField
                                            variant="standard"
                                            label="Телефон"
                                            value={companyData.companyContactPerson.phoneNumber}
                                            InputProps={{
                                                readOnly: true,
                                                sx: { fontSize: { xs: "20px", md: "24px" } },
                                            }}
                                            sx={{
                                                "& .MuiInput-underline:before": {
                                                    borderBottomColor: theme.palette.primary.main,
                                                },
                                                "& .MuiInput-underline:after": {
                                                    borderBottomColor: theme.palette.primary.main,
                                                },
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            ) : (
                                <></>
                            )}
                            {companyReviews !== undefined ? (
                                <Grid
                                    container
                                    item
                                    flexDirection={"column"}
                                    sx={{
                                        marginTop: { xs: "10px", md: "50px" },
                                        paddingLeft: { xs: "5px", md: 0 },
                                    }}
                                >
                                    {companyReviews.length > 0 ? (
                                        <>
                                            <Typography
                                                variant="h4"
                                                height={"69px"}
                                                display={"flex"}
                                                alignItems={"center"}
                                            >
                                                Отзывы
                                            </Typography>

                                            <Grid
                                                container
                                                item
                                                maxWidth={"700px"}
                                                flexDirection={"column"}
                                                gap={"25px"}
                                            >
                                                {companyReviews.map((review) => (
                                                    <CompanyReview key={review.id} companyReview={review} />
                                                ))}
                                            </Grid>
                                        </>
                                    ) : (
                                        <Typography
                                            variant="h4"
                                            height={"69px"}
                                            display={"flex"}
                                            alignItems={"center"}
                                        >
                                            Отзывов пока нет
                                        </Typography>
                                    )}
                                </Grid>
                            ) : (
                                <></>
                            )}{" "}
                        </>
                    ) : (
                        <CompanyEditForm
                            companyData={companyData}
                            cancelHandler={() => setEditMode(false)}
                            applyCallback={applyChanges}
                        />
                    )}
                </Grid>
            </Grid>
            <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
                <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default CompanyProfilePage;

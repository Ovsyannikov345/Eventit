import React, { useEffect, useMemo, useState } from "react";
import { Typography, Button, Container, Grid, Snackbar, Alert, Rating, Avatar } from "@mui/material";
import CalendarIcon from "@mui/icons-material/CalendarMonth";
import TimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import ExitIcon from "@mui/icons-material/ExitToApp";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent, getEventParticipants, joinEvent, leaveEvent } from "../../api/eventsApi";
import { getCompanyReviews } from "../../api/companiesApi";
import moment from "moment";
import UserHeader from "./../../components/headers/UserHeader";
import NavigateBack from "./../../components/NavigateBack";
import EventImage from "../../img/eventTempImage.png";
import addNoun from "./../../utils/fieldsParser";
import ShowDetailsButton from "./../../components/buttons/ShowDetailsButton";
import HideDetailsButton from "./../../components/buttons/HideDetailsButton";

// TODO implement event leaving.

const UserEventDetailsPage = () => {
    const { id } = useParams();

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
    const [companyReviews, setCompanyReviews] = useState(null);
    const [participants, setParticipants] = useState(null);

    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        var companyId;

        const loadEvent = async () => {
            const response = await getEvent(id);

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            // TODO remove.
            //console.log(response.data);

            companyId = response.data.company.id;
            setEvent(response.data);
        };

        const loadCompanyReviews = async () => {
            const response = await getCompanyReviews(companyId);

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setCompanyReviews(response.data);
        };

        const loadParticipants = async () => {
            const response = await getEventParticipants(id);

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            // TODO remove.
            console.log(response.data);

            setParticipants(response.data);
        };

        const loadData = async () => {
            await loadEvent();
            await loadCompanyReviews();
            await loadParticipants();
        };

        loadData();
    }, [id]);

    const placeRating = useMemo(() => {
        if (!event || !event.place || !event.place.placeReviews || event.place.placeReviews.length === 0) {
            return null;
        }

        var sum = 0;

        var count = 0;

        event.place.placeReviews.forEach((review) => {
            sum += review.grade;
            count++;
        });

        return Number.parseFloat((sum / count).toFixed(2));
    }, [event]);

    const companyRating = useMemo(() => {
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

    const isParticipant = useMemo(
        () => participants && participants.some((p) => p.id === Number.parseInt(localStorage.getItem("id"))),
        [participants]
    );

    const join = async () => {
        const response = await joinEvent(event.id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        setParticipants(response.data);
    };

    const leave = async () => {
        const response = await leaveEvent(event.id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        // TODO remove.
        console.log(response.data);

        setParticipants(response.data);
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
            pb={"20px"}
        >
            <UserHeader />
            <Grid
                container
                item
                mt={"100px"}
                borderRadius={"30px"}
                flexDirection={"column"}
                alignItems={"flex-start"}
                maxWidth={"1300px"}
                flexGrow={1}
                bgcolor={"#FFFFFF"}
                gap={4}
                pb={"30px"}
            >
                <Grid
                    container
                    item
                    pr={"40px"}
                    pl={"40px"}
                    mt={"40px"}
                    sx={{ paddingLeft: { xs: "15px", md: "20px" }, marginTop: { xs: "15px", md: "20px" } }}
                >
                    <NavigateBack label="Назад" to={-1} />
                </Grid>
                <Grid container item justifyContent={"space-between"} pl={"30px"}>
                    <Grid container item xs={4} justifyContent={"center"} alignItems={"flex-start"}>
                        {/* TODO impelement */}
                        <img src={EventImage} alt="event" style={{ maxWidth: "450px" }} />
                    </Grid>
                    <Grid
                        container
                        item
                        xs={7}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                        wrap="wrap"
                        rowGap={2}
                    >
                        <Grid container item xs={12}>
                            <Typography variant="h4" width={"100%"}>
                                {event?.title}
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            item
                            xs={10}
                            alignItems={"flex-start"}
                            justifyContent={"space-between"}
                            rowGap={2}
                        >
                            <Grid container item xs={5.5}>
                                <Grid container item alignItems={"center"} gap={"10px"}>
                                    <CalendarIcon />
                                    <Typography variant="h6">Дата начала</Typography>
                                </Grid>
                                <Typography variant="h5">
                                    {moment(event?.startDate).format("DD.MM.YYYY")}
                                </Typography>
                            </Grid>
                            <Grid container item xs={5.5}>
                                <Grid container item alignItems={"center"} gap={"10px"}>
                                    <CalendarIcon />
                                    <Typography variant="h6">Дата окончания</Typography>
                                </Grid>
                                <Typography variant="h5">
                                    {moment(event?.endDate).format("DD.MM.YYYY")}
                                </Typography>
                            </Grid>
                            <Grid container item xs={5.5}>
                                <Grid container item alignItems={"center"} gap={"10px"}>
                                    <TimeIcon />
                                    <Typography variant="h6">Время начала</Typography>
                                </Grid>
                                <Typography variant="h5" width={"100%"}>
                                    {moment(event?.startDate).format("HH:mm")}
                                </Typography>
                            </Grid>
                            <Grid container item xs={5.5}>
                                <Grid container item alignItems={"center"} gap={"10px"}>
                                    <TimeIcon />
                                    <Typography variant="h6">Время окончания</Typography>
                                </Grid>
                                <Typography variant="h5" width={"100%"}>
                                    {moment(event?.endDate).format("HH:mm")}
                                </Typography>
                            </Grid>
                            <Grid container item xs={5.5}>
                                {/* TODO open modal */}
                                <Button
                                    variant="outlined"
                                    style={{ borderWidth: "2px" }}
                                    startIcon={<PersonIcon />}
                                >
                                    Список участников
                                </Button>
                            </Grid>
                            {isParticipant && (
                                <Grid container item xs={5.5}>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        style={{ borderWidth: "2px" }}
                                        startIcon={<ExitIcon />}
                                        onClick={leave}
                                    >
                                        Покинуть мероприятие
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container item pl={"20px"} mt={"-20px"}>
                    {showDetails ? (
                        <HideDetailsButton onClick={() => setShowDetails(false)} />
                    ) : (
                        <ShowDetailsButton onClick={() => setShowDetails(true)} />
                    )}
                </Grid>
                {showDetails && (
                    <>
                        <Grid
                            container
                            item
                            flexDirection={"column"}
                            justifyContent={"flex-start"}
                            pl={"35px"}
                            gap={2}
                        >
                            <Grid container item flexDirection={"column"}>
                                <Typography variant="h6" style={{ textDecoration: "underline" }}>
                                    Место проведения
                                </Typography>
                                {event?.place ? (
                                    <>
                                        <Typography variant="h4">{event?.place?.name}</Typography>
                                        <Typography variant="h6">{event?.place?.address}</Typography>
                                        {placeRating ? (
                                            <>
                                                <Rating
                                                    readOnly
                                                    value={placeRating}
                                                    precision={0.5}
                                                    style={{ marginLeft: "-5px" }}
                                                    size="large"
                                                />
                                                <Typography>
                                                    (
                                                    {addNoun(event.place.placeReviews.length, [
                                                        "отзыв",
                                                        "отзыва",
                                                        "отзывов",
                                                    ])}
                                                    )
                                                </Typography>
                                            </>
                                        ) : (
                                            <Typography>(Нет рейтинга)</Typography>
                                        )}
                                    </>
                                ) : (
                                    <Typography variant="h4">Онлайн</Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            flexDirection={"column"}
                            justifyContent={"flex-start"}
                            pl={"35px"}
                            pr={"35px"}
                            gap={2}
                        >
                            <Grid container item flexDirection={"column"}>
                                <Typography variant="h6" style={{ textDecoration: "underline" }}>
                                    Описание
                                </Typography>
                                {/* TODO replace with real field */}
                                <Typography variant="h5">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget risus porta,
                                    tincidunt turpis at, fermentum nisi. Nam a nisl ut nisi fringilla congue a vel
                                    urna. Pellentesque habitant morbi tristique senectus et netus et malesuada
                                    fames ac turpis egestas. Suspendisse potenti. Vestibulum ante ipsum primis in
                                    faucibus orci luctus et ultrices posuere cubilia Curae donec pharetra, magna
                                    vestibulum ullamcorper ultrices, erat erat fermentum elit, nec sodales nisl
                                    nisi, interdum ornare orci ante eget arcu. In hac habitasse platea dictumst.
                                    Nullam scelerisque, lacus a pharetra posuere, magna nisi consectetur nibh, ut
                                    faucibus velit magna vel dui. Fusce venenatis, urna eget cursus malesuada,
                                    tortor eros congue nisl, ut commodo odio purus at ipsum. Donec bibendum
                                    ullamcorper nulla, quis faucibus velit interdum eu. Nulla facilisi. Sed
                                    lacinia commodo dui, a ullamcorper velit interdum et. Morbi a ipsum lorem.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            flexDirection={"column"}
                            justifyContent={"flex-start"}
                            pl={"35px"}
                            pr={"35px"}
                            gap={2}
                        >
                            <Grid container item flexDirection={"column"}>
                                <Typography variant="h6" style={{ textDecoration: "underline" }}>
                                    Возрастное ограничение
                                </Typography>
                                <Typography variant="h5">
                                    {event?.ageRestriction ? event?.ageRestriction + "+" : "Отсутствует"}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            flexDirection={"column"}
                            justifyContent={"flex-start"}
                            pl={"35px"}
                            pr={"35px"}
                            gap={2}
                        >
                            <Grid container item flexDirection={"column"}>
                                <Typography variant="h6" style={{ textDecoration: "underline" }}>
                                    Стоимость входа
                                </Typography>
                                <Typography variant="h5">
                                    {event?.entranceFee
                                        ? addNoun(event?.entranceFee, ["рубль", "рубля", "рублей"])
                                        : "Бесплатно"}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid
                            container
                            item
                            flexDirection={"column"}
                            justifyContent={"flex-start"}
                            pl={"35px"}
                            pr={"35px"}
                            gap={2}
                        >
                            <Grid container item flexDirection={"column"} gap={1}>
                                <Typography variant="h6" style={{ textDecoration: "underline" }}>
                                    Организатор
                                </Typography>
                                <Grid container item wrap="nowrap" gap={2}>
                                    <Button
                                        style={{ padding: 0 }}
                                        onClick={() => navigate(`/company/${event?.company.id}`)}
                                    >
                                        <Avatar
                                            alt={event?.company.name}
                                            src="/static/images/avatar/1.jpg"
                                            sx={{ width: 90, height: 90 }}
                                        />
                                    </Button>
                                    <Grid container item flexDirection={"column"}>
                                        <Typography variant="h6">{event?.company.name}</Typography>
                                        {companyRating ? (
                                            <>
                                                <Rating
                                                    readOnly
                                                    value={companyRating}
                                                    precision={0.5}
                                                    style={{ marginLeft: "-5px", marginTop: "5px" }}
                                                />
                                                <Typography>
                                                    (
                                                    {addNoun(companyReviews.length, [
                                                        "отзыв",
                                                        "отзыва",
                                                        "отзывов",
                                                    ])}
                                                    )
                                                </Typography>
                                            </>
                                        ) : (
                                            <Typography>(Нет отзывов)</Typography>
                                        )}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )}
                {participants && isParticipant ? (
                    <>
                        <h1>This is chat</h1>
                        {/* TODO implement chat */}
                    </>
                ) : (
                    <Container style={{ display: "flex", justifyContent: "center" }}>
                        {participants && (
                            <Button
                                variant="contained"
                                fullWidth
                                style={{ height: "40px", borderRadius: "30px", fontSize: "16px" }}
                                onClick={join}
                            >
                                Присоединиться
                            </Button>
                        )}
                    </Container>
                )}
            </Grid>
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
        </Grid>
    );
};

export default UserEventDetailsPage;

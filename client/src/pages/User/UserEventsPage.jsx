import React, { useEffect, useMemo, useState } from "react";
import { Grid, Typography, Snackbar, Alert } from "@mui/material";
import UserHeader from "../../components/headers/UserHeader";
import EventFilter from "./EventFilter";
import SortSelector from "./../../components/SortSelector";
import UserEvent from "../../components/UserEvent";
import { getSelfEvents } from "../../api/eventsApi";
import moment from "moment";

const UserEventsPage = () => {
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [success, setSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const [events, setEvents] = useState([]);
    const [sortOption, setSortOption] = useState("nearest");
    const [searchQuery, setSearchQuery] = useState({
        name: "",
        place: "",
        organizer: "",
        minAge: "",
        minPrice: "",
        maxPrice: "",
        startDate: null,
        endDate: null,
        showPast: false,
        showFinished: false,
    });

    const sortedEvents = useMemo(() => {
        const currentDate = new Date();

        switch (sortOption) {
            case "nearest":
                return [...events].sort((a, b) => {
                    const diffA = moment(a.startDate).diff(currentDate, "seconds");
                    const diffB = moment(b.startDate).diff(currentDate, "seconds");

                    if (diffA < diffB) {
                        return -1;
                    }
                    if (diffA > diffB) {
                        return 1;
                    }

                    return 0;
                });
            case "date asc":
                return [...events].sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
            case "date desc":
                return [...events].sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
            default:
                return [...events];
        }
    }, [events, sortOption]);

    const sortedAndFilteredEvents = useMemo(() => {
        const startDate = searchQuery.startDate ? moment(searchQuery.startDate, "YYYY-MM-DD") : null;
        const endDate = searchQuery.endDate ? moment(searchQuery.endDate, "YYYY-MM-DD") : null;

        return sortedEvents.filter(
            (event) =>
                event.title.toLowerCase().includes(searchQuery.name.toLowerCase()) &&
                ((!searchQuery.place && !event.place) ||
                    event.place?.name.toLowerCase().includes(searchQuery.place.toLowerCase())) &&
                (!searchQuery.minAge || (event.ageRestriction ?? 0) <= searchQuery.minAge) &&
                (!searchQuery.minPrice || (event.entranceFee ?? 0) >= searchQuery.minPrice) &&
                (!searchQuery.maxPrice || (event.entranceFee ?? 0) <= searchQuery.maxPrice) &&
                (!startDate || moment(event.startDate, "YYYY-MM-DD").isSameOrAfter(startDate)) &&
                (!endDate || moment(event.startDate, "YYYY-MM-DD").isSameOrBefore(endDate)) &&
                (searchQuery.showPast || moment(event.startDate).isSameOrAfter(new Date())) &&
                (searchQuery.showFinished || !event.isFinished)
        );
    }, [searchQuery, sortedEvents]);

    useEffect(() => {
        const loadEvents = async () => {
            const response = await getSelfEvents();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setEvents(response.data);
        };

        const loadData = async () => {
            await loadEvents();
        };

        loadData();
    }, []);

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

        setError(false);
        setSuccess(false);
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
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                wrap="nowrap"
                maxWidth={"1300px"}
                gap={"10px"}
                flexGrow={1}
                bgcolor={"#FFFFFF"}
                mt={"100px"}
                borderRadius={"30px"}
                pb={"30px"}
                pr={"10px"}
            >
                <EventFilter queryHandler={setSearchQuery} successHandler={displaySuccess} />
                <Grid
                    container
                    item
                    mt={"10px"}
                    gap={"10px"}
                    pb={"40px"}
                    sx={{ paddingLeft: { md: "19px", lg: 0 }, paddingRight: { md: "19px", lg: 0 } }}
                >
                    <Grid
                        container
                        item
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        mb={"-5px"}
                        sx={{ marginLeft: { xs: "10px", md: "0px" } }}
                    >
                        <Typography variant="h4" height={"69px"} display={"flex"} alignItems={"center"}>
                            Ваши мероприятия
                        </Typography>
                        <Grid container item width={"201px"}>
                            <SortSelector
                                options={[
                                    { value: "nearest", name: "Ближайшие" },
                                    { value: "date desc", name: "Сначала новые" },
                                    { value: "date asc", name: "Сначала старые" },
                                ]}
                                value={sortOption}
                                changeHandler={setSortOption}
                            />
                        </Grid>
                    </Grid>

                    <Grid container item justifyContent={"flex-start"} rowGap={"10px"} gap={"5px"}>
                        {sortedAndFilteredEvents.length > 0 ? (
                            sortedAndFilteredEvents.map((event) => <UserEvent key={event.id} event={event} />)
                        ) : (
                            <Grid container justifyContent={"center"}>
                                <Typography variant="h5" height={"69px"}>
                                    Мероприятия по запросу не найдены
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
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

export default UserEventsPage;

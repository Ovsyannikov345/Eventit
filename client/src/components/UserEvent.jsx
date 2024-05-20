import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import EventImage from "../img/eventTempImage.png";
import addNoun from "./../utils/fieldsParser";
import moment from "moment";
import "moment/locale/ru";
import { useNavigate } from "react-router-dom";

const UserEvent = ({ event }) => {
    const navigate = useNavigate();

    moment.locale("ru");

    return (
        <Grid
            container
            item
            xs={3.95}
            flexDirection={"column"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            pt={"10px"}
            pb={"10px"}
            bgcolor={"#E1EBFA"}
            borderRadius={"10px"}
        >
            <Grid container item justifyContent={"center"} alignItems={"center"}>
                {/* TODO impelement */}
                <img
                    src={EventImage}
                    alt="event"
                    style={{
                        maxWidth: "240px",
                        maxHeight: "152px",
                        borderRadius: "15px",
                        objectFit: "contain",
                    }}
                />
            </Grid>
            <Typography
                variant="h6"
                textAlign={"center"}
                sx={{ borderBottom: "1px solid #729CDB", width: "90%" }}
            >
                {event.title}
            </Typography>
            <Typography variant="h6">{event.place?.name || "Онлайн"}</Typography>
            <Typography variant="body1">{moment(event.startDate).format("D MMMM [в] HH:mm")}</Typography>
            <Typography variant="body1">
                {event.entranceFee ? addNoun(event.entranceFee, ["рубль", "рубля", "рублей"]) : "Бесплатно"},{" "}
                {event.ageRestriction ? event.ageRestriction + "+" : "Без ограничений"}
            </Typography>

            <Grid container item pr={"10px"} pl={"10px"} justifyContent={"space-between"}>
                <Typography variant="body1" color={"error"}>
                    {event.isFinished ? "ЗАВЕРШЕНО" : " "}
                </Typography>
                <Typography variant="body2">{moment(event.creationDate).format("DD.MM.YYYY")}</Typography>
            </Grid>
            <Grid container item justifyContent={"center"}>
                <Button
                    variant="outlined"
                    sx={{ width: "95%", borderWidth: "2px" }}
                    onClick={() => navigate(`/events/${event.id}`)}
                >
                    Подробнее
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserEvent;

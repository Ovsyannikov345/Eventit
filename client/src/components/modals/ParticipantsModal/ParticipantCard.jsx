import { Avatar, Grid, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import addNoun from "./../../../utils/fieldsParser";

const ParticipantCard = ({ participant }) => {
    const navigate = useNavigate();

    return (
        <Grid container item alignItems={"center"}>
            <Button style={{ padding: 0 }} onClick={() => navigate(`/user/${participant.id}`)}>
                <Avatar
                    alt={participant.name}
                    src={`http://localhost:5000/api/Users/${participant.id}/avatar`}
                    sx={{ width: 50, height: 50 }}
                />
            </Button>
            <Grid item>
                <Grid container flexDirection={"column"}>
                    <Typography>
                        {[participant.lastName, participant.firstName, participant.patronymic].join(" ")}
                    </Typography>
                    <Typography>
                        {participant.events && participant.events.length > 0
                            ? addNoun(participant.events.length, ["мероприятие", "мероприятия", "мероприятий"])
                            : "Нет мероприятий"}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default ParticipantCard;

import React from "react";
import { Dialog, Typography, Grid } from "@mui/material";
import ParticipantsList from "./ParticipantsList";

const ParticipantsModal = ({ isOpen, onClose, participants }) => {
    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                style: { margin: 0, borderRadius: "10px" },
                sx: { maxWidth: { xs: "310px", md: "483px" } },
            }}
        >
            <Grid
                container
                item
                flexDirection={"column"}
                alignItems={"center"}
                gap={"20px"}
                sx={{
                    width: { xs: "310px", md: "483px" },
                    pl: { xs: "5px", md: "28px" },
                    pr: { xs: "5px", md: "28px" },
                    pb: { xs: "9px", md: "25px" },
                }}
            >
                <Typography variant="h5" height={"69px"} display={"flex"} alignItems={"center"}>
                    Список участников
                </Typography>
                <ParticipantsList participants={participants} />
            </Grid>
        </Dialog>
    );
};

export default ParticipantsModal;

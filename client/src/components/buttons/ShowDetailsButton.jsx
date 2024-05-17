import { IconButton } from "@mui/material";
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ShowDetailsButton = ({ onClick }) => {
    return (
        <IconButton color="primary" onClick={() => onClick()}>
            <ExpandMoreIcon></ExpandMoreIcon>
            Показать подробности
        </IconButton>
    );
};

export default ShowDetailsButton;

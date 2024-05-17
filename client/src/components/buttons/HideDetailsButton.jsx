import { IconButton } from "@mui/material";
import React from "react";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const HideDetailsButton = ({ onClick }) => {
    return (
        <IconButton color="primary" onClick={() => onClick()}>
            <ExpandLessIcon></ExpandLessIcon>
            Скрыть подробности
        </IconButton>
    );
};

export default HideDetailsButton;

import React from "react";
import { Dialog, Typography, Grid, Button, Container } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

const ConfirmationModal = ({ isOpen, message, acceptHandler, declineHandler }) => {
    const closeModal = () => {
        declineHandler();
    };

    return (
        <Dialog open={isOpen} onClose={closeModal}>
            <Typography variant="h6" paddingLeft={3} paddingRight={3} marginTop={1} textAlign={"center"}>
                {message}
            </Typography>
            <Container>
                <Grid container justifyContent={"space-evenly"} marginTop={2} marginBottom={2} wrap="nowrap">
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="success"
                            style={{ borderWidth: "2px" }}
                            startIcon={<DoneIcon />}
                            onClick={acceptHandler}
                        >
                            Да
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="outlined"
                            color="error"
                            style={{ borderWidth: "2px" }}
                            startIcon={<ClearIcon />}
                            onClick={declineHandler}
                        >
                            Нет
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Dialog>
    );
};

export default ConfirmationModal;

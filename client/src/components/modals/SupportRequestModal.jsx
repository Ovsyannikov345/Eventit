import React, { useState } from "react";
import { Dialog, Typography, Grid, Button, TextField, CircularProgress } from "@mui/material";
import { postSupportRequest } from "../../api/supportRequestsApi";

const SupportRequestModal = ({ isOpen, onClose, displaySuccess, displayError }) => {
    const [isLoading, setIsLoading] = useState(false);

    const [request, setRequest] = useState({
        title: "",
        description: "",
    });

    const sendRequest = async () => {
        if (request.title === "") {
            displayError("Заполните заголовок проблемы");
            return;
        } else if (request.title.length > 100) {
            displayError("Длина заголовка не более 100 символов");
            return;
        }

        if (request.description === "") {
            displayError("Заполните описание проблемы");
            return;
        } else if (request.description.length > 500) {
            displayError("Длина описания не более 500 символов");
            return;
        }

        setIsLoading(true);

        const response = await postSupportRequest(request);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            setIsLoading(false);
            return;
        }

        setRequest({ title: "", description: "" });
        setIsLoading(false);
        displaySuccess("Обращение отправлено");
        onClose();
    };

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
                    Опишите вашу проблему
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Заголовок"
                    value={request.title}
                    onChange={(e) => setRequest({ ...request, title: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Описание"
                    multiline
                    minRows={4}
                    value={request.description}
                    onChange={(e) => setRequest({ ...request, description: e.target.value })}
                />
                {!isLoading ? (
                    <Grid container item>
                        <Button variant="contained" fullWidth onClick={sendRequest}>
                            ОТПРАВИТЬ
                        </Button>
                    </Grid>
                ) : (
                    <Grid container justifyContent={"center"}>
                        <CircularProgress color="primary" style={{ marginTop: "10px" }} />
                    </Grid>
                )}
            </Grid>
        </Dialog>
    );
};

export default SupportRequestModal;

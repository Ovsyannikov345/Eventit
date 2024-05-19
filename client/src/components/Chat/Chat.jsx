import React, { useEffect, useMemo, useState } from "react";
import {
    Box,
    Chip,
    Divider,
    List,
    ListItem,
    Snackbar,
    Alert,
    TextField,
    InputAdornment,
    IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import { getEventChat } from "../../api/eventsApi";
import { postMessage } from "../../api/messagesApi";
import Message from "./Message";

const Chat = ({ eventId, companyId }) => {
    const [chat, setChat] = useState(null);
    const [messageText, setMessageText] = useState(null);

    useEffect(() => {
        const loadChat = async () => {
            const response = await getEventChat(eventId);

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setChat(response.data);
        };

        const loadData = async () => {
            await loadChat();
        };

        loadData();
    }, [eventId]);

    const groupedMessages = useMemo(() => {
        if (!chat?.messages || chat.messages.length === 0) {
            return [];
        }

        const groups = {};

        chat.messages.forEach((message) => {
            const date = moment(message.creationDate).format("YYYY-MM-DD");

            if (!groups[date]) {
                groups[date] = [];
            }

            groups[date].push(message);
        });

        const groupsArray = Object.entries(groups).sort((a, b) => new Date(a[0]) - new Date(b[0]));

        groupsArray.forEach((group) => {
            group[1].sort((a, b) => new Date(a.creationDate) - new Date(b.creationDate));
        });

        return Object.entries(groups).sort((a, b) => new Date(a[0]) - new Date(b[0]));
    }, [chat]);

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

    const reloadChat = async () => {
        const response = await getEventChat(eventId);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        setChat(response.data);
    };

    const canSend =
        !chat?.isPublic ||
        (localStorage.getItem("role") === "company" && companyId === Number.parseInt(localStorage.getItem("id")));

    const send = async () => {
        const message = {
            text: messageText,
            chatId: chat.id,
        };

        console.log(chat);
        console.log(message);

        const response = await postMessage(message);

        if (!response.status || response.status >= 300) {
            displayError("Ошибка при отправке сообщения");
            return;
        }

        setMessageText(null);

        await reloadChat();
    };

    return (
        <>
            <Box
                sx={{
                    height: "500px",
                    width: "80%",
                    overflow: "auto",
                    "&::-webkit-scrollbar": {
                        width: "0.4em",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "#E5E5E5",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#729CDB",
                        borderRadius: "30px",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#678DC6",
                    },
                }}
            >
                <List>
                    <ListItem sx={{ justifyContent: "center" }}>
                        <Divider
                            sx={{
                                width: "90%",
                                "&::after": { borderTop: "2px solid #729CDB" },
                                "&::before": { borderTop: "2px solid #729CDB" },
                            }}
                        >
                            <Chip label="Начало чата" size="small" sx={{ backgroundColor: "#FFF" }} />
                        </Divider>
                    </ListItem>
                    {groupedMessages.map(([date, messages]) => (
                        <>
                            <ListItem sx={{ justifyContent: "center" }}>
                                <Divider
                                    sx={{
                                        width: "90%",
                                        "&::after": { borderTop: "2px solid #729CDB" },
                                        "&::before": { borderTop: "2px solid #729CDB" },
                                    }}
                                >
                                    <Chip
                                        label={moment(date).format("DD.MM.YYYY")}
                                        size="small"
                                        sx={{ backgroundColor: "#FFF" }}
                                    />
                                </Divider>
                            </ListItem>
                            {messages.map((message) => (
                                <Message
                                    key={message.id}
                                    message={message}
                                    fromOwner={message.company && message.company.id === companyId}
                                    fromSelf={
                                        (localStorage.getItem("role") === "company" &&
                                            message.company?.id ===
                                                Number.parseInt(localStorage.getItem("id"))) ||
                                        (localStorage.getItem("role") === "user" &&
                                            message.user?.id === Number.parseInt(localStorage.getItem("id")))
                                    }
                                />
                            ))}
                        </>
                    ))}
                </List>
                <Snackbar open={error} autoHideDuration={6000} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Box>
            <TextField
                sx={{ width: "80%", mt: "10px", mb: "10px" }}
                placeholder={canSend ? "Написать сообщение..." : "Вы не можете писать сообщения"}
                multiline
                disabled={!canSend}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton disabled={!messageText || !canSend} onClick={send}>
                                <SendIcon color="primary" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                value={messageText || ""}
                onChange={(e) => setMessageText(e.target.value)}
            ></TextField>
        </>
    );
};

export default Chat;

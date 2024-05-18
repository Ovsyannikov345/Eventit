import React from "react";
import { ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Box } from "@mui/material";
import moment from "moment";

const Message = ({ message, fromOwner, fromSelf }) => {
    return (
        <ListItem
            key={message.id}
            sx={{ alignItems: "flex-start", justifyContent: fromSelf ? "flex-end" : "flex-start" }}
        >
            {!fromSelf && (
                <ListItemAvatar sx={{ marginTop: "6px" }}>
                    <Avatar alt={message.name} src={message.avatar} style={{ width: 40, height: 40 }} />
                </ListItemAvatar>
            )}
            <ListItemText
                sx={{ maxWidth: "85%", flex: "none" }}
                primary={
                    <>
                        {!fromSelf && (
                            <Typography sx={{ display: "inline" }} component="span" variant="body1" color="text">
                                {message.user
                                    ? [message.user.lastName, message.user.firstName].join(" ")
                                    : [
                                          message.company.companyContactPerson.lastName,
                                          message.company.companyContactPerson.firstName,
                                      ].join(" ")}
                            </Typography>
                        )}
                        <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.secondary"
                        >
                            {(!fromSelf ? " - " : "") + moment(message.creationDate).format("HH:mm")}
                        </Typography>
                        {fromOwner && (
                            <Typography
                                sx={{ display: "inline", ml: "10px", mr: "10px" }}
                                component="span"
                                variant="body1"
                                style={{ color: "#5B81B9", fontWeight: "600" }}
                            >
                                Представитель
                            </Typography>
                        )}
                    </>
                }
                secondary={
                    <Box
                        sx={{
                            backgroundColor: "#C9DFFF",
                            padding: "10px",
                            borderRadius: "10px",
                            display: "inline-flex",
                        }}
                    >
                        <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            {message.text}
                        </Typography>
                    </Box>
                }
            />
        </ListItem>
    );
};

export default Message;

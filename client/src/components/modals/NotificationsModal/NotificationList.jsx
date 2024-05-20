import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Typography, Button, Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import RateReviewIcon from "@mui/icons-material/RateReview";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const NotificationList = ({ notifications, readNotification }) => {
    const navigate = useNavigate();

    notifications.forEach((notification) => {
        switch (notification.type) {
            case "eventStart":
                notification.icon = <AccessTimeIcon />;
                break;
            case "placeReview":
                notification.icon = <RateReviewIcon />;
                break;
            case "eventReview":
                notification.icon = <RateReviewIcon />;
                break;
            default:
                notification.icon = <CheckCircleIcon />;
                break;
        }
    });

    return (
        <List sx={{ minWidth: "100%" }}>
            {notifications.length > 0 &&
                notifications.map((notification) => (
                    <ListItem key={notification.id} alignItems="center">
                        <ListItemIcon sx={{ minWidth: "30px", alignSelf: "flex-start", mt: "8px" }}>
                            {notification.icon}
                        </ListItemIcon>
                        <ListItemText
                            primary={notification.title}
                            secondary={
                                <>
                                    <Typography component="span" variant="body2" color="text.primary">
                                        {notification.description}
                                    </Typography>
                                </>
                            }
                        />
                        <Grid
                            item
                            container
                            xs={4}
                            flexDirection={"column"}
                            justifyContent={"flex-start"}
                            gap={"5px"}
                        >
                            {!notification.isRead && (
                                <Button
                                    variant="outlined"
                                    size="small"
                                    sx={{ borderWidth: "2px" }}
                                    onClick={() => readNotification(notification.id)}
                                >
                                    Прочитано
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => navigate(`/events/${notification.eventId}`)}
                            >
                                Подробнее
                            </Button>
                        </Grid>
                    </ListItem>
                ))}
            {!notifications.length && (
                <Typography variant="h6" textAlign={"center"}>
                    Нет уведомлений
                </Typography>
            )}
        </List>
    );
};

export default NotificationList;

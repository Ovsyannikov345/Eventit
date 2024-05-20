import React, { useEffect, useState } from "react";
import { Box, Tabs, Tab, Button } from "@mui/material";
import { getNotifications, readAllNotifications, readNotification } from "../../../api/notificationsApi";
import NotificationList from "./NotificationList";

const NotificationTabs = ({ displayError }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const loadNotifications = async () => {
            const response = await getNotifications();

            if (!response.status || response.status >= 300) {
                displayError(response.data.error);
                return;
            }

            setNotifications(response.data);
        };

        loadNotifications();
    }, [displayError]);

    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const read = async (id) => {
        const response = await readNotification(id);

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        const modifiedNotifications = [...notifications];

        const index = modifiedNotifications.findIndex((n) => n.id === id);

        if (index !== -1) {
            modifiedNotifications[index].isRead = true;
        }

        setNotifications(modifiedNotifications);
    };

    const readAll = async () => {
        const response = await readAllNotifications();

        if (!response.status || response.status >= 300) {
            displayError(response.data.error);
            return;
        }

        const modifiedNotifications = [...notifications];

        modifiedNotifications.forEach((notification) => {
            notification.isRead = true;
        });

        setNotifications(modifiedNotifications);
    };

    return (
        <Box>
            <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="Unread" />
                <Tab label="Read" />
            </Tabs>
            <Box sx={{ p: 2 }}>
                {tabValue === 0 && (
                    <>
                        <NotificationList
                            notifications={notifications.filter((n) => !n.isRead)}
                            readNotification={read}
                        />
                        {notifications.filter((n) => !n.isRead).length > 0 ? (
                            <Button onClick={readAll}>Прочитать все</Button>
                        ) : (
                            <></>
                        )}
                    </>
                )}
                {tabValue === 1 && <NotificationList notifications={notifications.filter((n) => n.isRead)} />}
            </Box>
        </Box>
    );
};

export default NotificationTabs;

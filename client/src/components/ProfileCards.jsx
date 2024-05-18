import React from "react";
import { Grid, Typography } from "@mui/material";
import CalendarIcon from "@mui/icons-material/CalendarTodayOutlined";
import ListIcon from "@mui/icons-material/ListAltOutlined";
import StarIcon from "@mui/icons-material/StarOutlineOutlined";

const ProfileCards = ({ registrationDate, eventCount, rating }) => {
  return (
    <Grid
      container
      item
      sx={{ marginTop: { xs: "30px", md: "85px" }, gap: { xs: "30px", md: "60px" } }}
    >
      {registrationDate && (
        <Grid container item width={"194px"} gap={"15px"}>
          <CalendarIcon sx={{ fontSize: 50 }} />
          <Grid>
            <Typography variant="h3" height={"23px"} display={"flex"} alignItems={"center"}>
              В сервисе с
            </Typography>
            <Typography variant="h2">{registrationDate}</Typography>
          </Grid>
        </Grid>
      )}
      {eventCount && (
        <Grid container item width={"194px"} gap={"15px"}>
          <ListIcon sx={{ fontSize: 50 }} />
          <Grid>
            <Typography variant="h3" height={"23px"} display={"flex"} alignItems={"center"}>
              Мероприятий
            </Typography>
            <Typography variant="h2">{eventCount}</Typography>
          </Grid>
        </Grid>
      )}
      {rating && (
        <Grid container item width={"194px"} gap={"15px"}>
          <StarIcon sx={{ fontSize: 50 }} />
          <Grid>
            <Typography variant="h3" height={"23px"} display={"flex"} alignItems={"center"}>
              Рейтинг
            </Typography>
            <Typography variant="h2">{rating}</Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default ProfileCards;
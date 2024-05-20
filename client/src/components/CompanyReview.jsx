import React from "react";
import { Grid, Typography, Rating, Avatar, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CompanyReview = ({ companyReview }) => {
    const navigate = useNavigate();

    return (
        <Grid
            container
            item
            padding={"15px"}
            gap={"8px"}
            style={{ border: "2px solid #729CDB", borderRadius: "10px" }}
        >
            <Button style={{ padding: 0 }} onClick={() => navigate(`/user/${companyReview.user.id}`)}>
                <Avatar
                    //src={
                    //    companyReview.User.id !== undefined
                    //        ? `http://localhost:5000/api/users/${
                    //              companyReview.User.id
                    //          }/avatar?jwt=${localStorage.getItem("jwt")}`
                    //        : ""
                    //}
                    variant="square"
                    sx={{ width: 60, height: 60 }}
                />
            </Button>
            <Stack
                direction={"row"}
                justifyContent={"space-between"}
                flexGrow={1}
                sx={{ flexDirection: { xs: "column", md: "row" } }}
            >
                <Typography
                    variant="h4"
                    height={"35px"}
                    style={{ borderBottom: "2px solid #729CDB" }}
                    sx={{ fontSize: { xs: "20px", md: "24px" } }}
                >
                    {companyReview.user.lastName + " " + companyReview.user.firstName}
                </Typography>
                <Rating name="read-only" value={companyReview.grade} readOnly />
            </Stack>
            <Typography variant="h5" pl={"67px"} width={"100%"} sx={{ paddingLeft: { xs: "0", md: "67px" } }}>
                {companyReview.description}
            </Typography>
        </Grid>
    );
};

export default CompanyReview;

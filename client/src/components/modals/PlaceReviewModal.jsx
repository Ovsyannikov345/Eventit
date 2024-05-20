import React, { useState } from "react";
import { Dialog, Typography, Grid, Button, Rating } from "@mui/material";

const PlaceReviewModal = ({ isOpen, onClose, acceptHandler }) => {
    const [grade, setGrade] = useState(0);

    return (
        <Dialog
            open={isOpen}
            onClose={onClose}
            PaperProps={{
                style: { margin: 0, borderRadius: "10px" },
                sx: { maxWidth: { xs: "300px", md: "483px" } },
            }}
        >
            <Grid
                container
                item
                width={"483px"}
                pl={"28px"}
                pr={"28px"}
                pb={"25px"}
                flexDirection={"column"}
                alignItems={"center"}
                sx={{
                    width: { xs: "300px", md: "483px" },
                }}
            >
                <Typography variant="h6" paddingLeft={3} paddingRight={3} marginTop={1} textAlign={"center"}>
                    Оцените место проведения
                </Typography>
                <Grid container gap={"5px"} justifyContent={"center"} mt={"10px"}>
                    <Rating
                        id="grade"
                        name="grade"
                        size="large"
                        sx={{
                            fontSize: "45px",
                        }}
                        value={grade}
                        onChange={(e, newValue) => {
                            setGrade(newValue);
                        }}
                    />
                </Grid>
                <Grid container item mt={"20px"}>
                    <Button variant="contained" fullWidth disabled={!grade} onClick={() => acceptHandler(grade)}>
                        ОТПРАВИТЬ ОЦЕНКУ
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default PlaceReviewModal;

import React, { useState } from "react";
import { Dialog, Typography, Grid, Button, Rating, TextField } from "@mui/material";

const EventReviewModal = ({ isOpen, onClose, acceptHandler }) => {
    const [review, setReview] = useState({
        description: "",
        grade: null,
    });

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
                    Оцените мероприятие
                </Typography>
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Ваше мнение"
                    multiline
                    minRows={3}
                    value={review.text}
                    onChange={(e) => setReview({ ...review, description: e.target.value })}
                    error={review.description.length > 500}
                    helperText={"Длина не более 500 символов"}
                />
                <Grid container gap={"5px"} justifyContent={"center"} mt={"10px"}>
                    <Rating
                        id="grade"
                        name="grade"
                        size="large"
                        sx={{
                            fontSize: "45px",
                        }}
                        value={review.grade}
                        onChange={(e, newValue) => {
                            setReview({ ...review, grade: newValue });
                        }}
                    />
                </Grid>
                <Grid container item mt={"20px"}>
                    <Button
                        variant="contained"
                        fullWidth
                        disabled={!review.grade || !review.description || review.description.length > 500}
                        onClick={() => acceptHandler(review)}
                    >
                        ОТПРАВИТЬ ОТЗЫВ
                    </Button>
                </Grid>
            </Grid>
        </Dialog>
    );
};

export default EventReviewModal;

import React, { useEffect, useState } from "react";
import { Grid, Typography, TextField, Button, Checkbox, FormControlLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";

const EventFilter = ({ queryHandler, successHandler }) => {
    const [searchQuery, setSearchQuery] = useState(
        JSON.parse(localStorage.getItem("eventSearchQuery")) ?? {
            name: "",
            place: "",
            organizer: "",
            minAge: "",
            minPrice: "",
            maxPrice: "",
            startDate: null,
            endDate: null,
            showPast: false,
            showFinished: false,
        }
    );

    useEffect(() => {
        const query = {
            ...searchQuery,
            startDate: searchQuery.startDate !== "Invalid date" ? searchQuery.startDate : null,
            endDate: searchQuery.endDate !== "Invalid date" ? searchQuery.endDate : null,
        };

        localStorage.setItem("eventSearchQuery", JSON.stringify(query));

        queryHandler(query);
    }, [searchQuery, queryHandler]);

    const resetFilter = () => {
        setSearchQuery({
            name: "",
            place: "",
            organizer: "",
            minAge: "",
            minPrice: "",
            maxPrice: "",
            startDate: null,
            endDate: null,
            showPast: false,
            showFinished: false,
        });

        successHandler("Фильтры сброшены");
    };

    return (
        <Grid
            container
            item
            flexDirection={"column"}
            alignItems={"center"}
            maxWidth={"300px"}
            minWidth={"300px"}
            mt={"76px"}
            ml={"10px"}
            pt={"5px"}
            pb={"15px"}
            borderRadius={"10px"}
            style={{ boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.25)" }}
        >
            <Grid container item maxWidth={"246px"} gap={"10px"}>
                <Grid container item justifyContent={"center"} mb={"5px"}>
                    <Typography variant="h5">Поиск</Typography>
                </Grid>
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Название"
                    autoComplete="off"
                    value={searchQuery.name}
                    onChange={(e) => setSearchQuery({ ...searchQuery, name: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Место"
                    value={searchQuery.place}
                    onChange={(e) => setSearchQuery({ ...searchQuery, place: e.target.value })}
                />
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Организатор"
                    value={searchQuery.organizer}
                    onChange={(e) => setSearchQuery({ ...searchQuery, organizer: e.target.value })}
                />
                <Typography variant="h6" height={"20px"} display={"flex"} alignItems={"center"}>
                    Возраст
                </Typography>
                <Grid container item justifyContent={"space-between"}>
                    <Grid container item xs={5}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="От"
                            type="number"
                            autoComplete="off"
                            value={searchQuery.minAge}
                            onChange={(e) => setSearchQuery({ ...searchQuery, minAge: e.target.value })}
                        ></TextField>
                    </Grid>
                </Grid>
                <Typography variant="h6" height={"20px"} display={"flex"} alignItems={"center"}>
                    Стоимость
                </Typography>
                <Grid container item justifyContent={"space-between"}>
                    <Grid container item xs={5}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="От"
                            type="number"
                            autoComplete="off"
                            value={searchQuery.minPrice}
                            onChange={(e) => setSearchQuery({ ...searchQuery, minPrice: e.target.value })}
                        ></TextField>
                    </Grid>
                    <Grid container item xs={5}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="До"
                            autoComplete="off"
                            type="number"
                            value={searchQuery.maxPrice}
                            onChange={(e) => setSearchQuery({ ...searchQuery, maxPrice: e.target.value })}
                        ></TextField>
                    </Grid>
                </Grid>
                <Typography variant="h6" height={"20px"} display={"flex"} alignItems={"center"}>
                    Дата начала
                </Typography>
                <DatePicker
                    sx={{ width: "100%" }}
                    label="От"
                    slotProps={{ textField: { variant: "standard" } }}
                    value={searchQuery.startDate != null ? moment(searchQuery.startDate) : null}
                    onChange={(newDate) =>
                        setSearchQuery({ ...searchQuery, startDate: moment(newDate).format("YYYY-MM-DD") })
                    }
                />
                {searchQuery.startDate && (
                    <Button
                        sx={{ padding: 0, ml: "-5px", mt: "-5px" }}
                        onClick={() => setSearchQuery({ ...searchQuery, startDate: null })}
                    >
                        Сброс
                    </Button>
                )}
                <DatePicker
                    sx={{ width: "100%" }}
                    label="До"
                    slotProps={{ textField: { variant: "standard" } }}
                    minDate={searchQuery.startDate != null ? moment(searchQuery.startDate) : null}
                    value={searchQuery.endDate != null ? moment(searchQuery.endDate) : null}
                    onChange={(newDate) =>
                        setSearchQuery({ ...searchQuery, endDate: moment(newDate).format("YYYY-MM-DD") })
                    }
                />
                {searchQuery.endDate && (
                    <Button
                        sx={{ padding: 0, ml: "-5px", mt: "-5px" }}
                        onClick={() => setSearchQuery({ ...searchQuery, endDate: null })}
                    >
                        Сброс
                    </Button>
                )}
                <FormControlLabel
                    control={
                        <Checkbox
                            value={searchQuery.showPast}
                            checked={searchQuery.showPast}
                            onChange={(e) => setSearchQuery({ ...searchQuery, showPast: e.target.checked })}
                        />
                    }
                    label="Показывать прошедшие"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            value={searchQuery.showFinished}
                            checked={searchQuery.showFinished}
                            onChange={(e) => setSearchQuery({ ...searchQuery, showFinished: e.target.checked })}
                        />
                    }
                    label="Показывать завершенные"
                />
                <Grid container item height={"42px"} mt={"12px"}>
                    <Button variant="outlined" fullWidth onClick={resetFilter}>
                        СБРОСИТЬ ФИЛЬТРЫ
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EventFilter;

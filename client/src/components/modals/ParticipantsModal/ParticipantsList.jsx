import React, { useEffect, useMemo, useState } from "react";
import { Grid, Typography, Pagination } from "@mui/material";
import ParticipantCard from "./ParticipantCard";
import { ITEMS_PER_PAGE } from "./../../../utils/consts";

const ParticipantsList = ({ participants }) => {
    const [page, setPage] = useState(1);
    const [pageParticipants, setPageParticipants] = useState(null);

    const pagesCount = useMemo(() => {
        var count = Math.floor(participants.length / ITEMS_PER_PAGE);

        if (participants.length % ITEMS_PER_PAGE !== 0) {
            count++;
        }

        return count;
    }, [participants]);

    useEffect(() => {
        setPageParticipants(participants.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE));
    }, [participants, page]);

    const changePage = (event, value) => {
        setPage(value);
    };

    return (
        <>
            {participants && participants.length > 0 ? (
                <>
                    <Grid container item flexDirection={"column"} gap={"10px"}>
                        {pageParticipants?.map((p) => (
                            <ParticipantCard key={p.id} participant={p} />
                        ))}
                    </Grid>
                    <Grid container justifyContent="center">
                        <Pagination
                            count={pagesCount}
                            color="primary"
                            shape="rounded"
                            page={page}
                            onChange={changePage}
                        ></Pagination>
                    </Grid>
                </>
            ) : (
                <Typography variant="h6" display={"flex"} alignItems={"center"}>
                    Список участников пуст
                </Typography>
            )}
        </>
    );
};

export default ParticipantsList;

import React from "react";
import { Container, Typography, TextField, Checkbox, FormControlLabel, Button, Input  } from "@mui/material";
import CompanyHeader from "../../headers/СompanyHeader";

const CreateEventPage = () => {
  return (
    <div>
      <CompanyHeader />
      <Container
        sx={{
          marginTop: "12vh",
          marginBottom: "10vh",
          backgroundColor: "white",
          width: "60vw",
          borderRadius: "43px",
          paddingBottom: "5vh",
        }}
      >
        <Typography variant="h3" sx={{ paddingTop: "7vh", textAlign: "center", fontSize: "5vh" }}>
          Хотите создать мероприятие?
        </Typography>
        <Typography variant="h4" color="gray" sx={{ textAlign: "center", marginTop: "5vh", marginBottom: "5vh", fontFamily: "Roboto" }}>
          Что ж, начнем....
        </Typography>
        <form>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "3vh",
            }}
          >
            <div style={{ width: "30%" }}>
              <Typography variant="body1" sx={{ marginBottom: 0, fontSize: "15px", color: "grey" }}>
                Дата проведения
              </Typography>
              <TextField type="date" fullWidth />
            </div>
            <div style={{ width: "30%" }}>
              <Typography variant="body1" sx={{ marginBottom: 0, fontSize: "15px", color: "grey" }}>
                Время проведения
              </Typography>
              <TextField type="time" fullWidth />
            </div>
            <div style={{ width: "30%" }}>
              <Typography variant="body1" sx={{ marginBottom: 0, fontSize: "15px", color: "grey" }}>
                Время окончания
              </Typography>
              <TextField type="time" fullWidth />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "40%", marginBottom: "3vh" }}>
            <Typography variant="body1" sx={{ marginBottom: 0, fontSize: "15px", color: "grey" }}>
              Место проведения
            </Typography>
            <TextField placeholder="Название" fullWidth />
            <TextField placeholder="Адрес" fullWidth sx={{ marginTop: "2vh"}} />
          </div>
          <Container
              sx={{
                width: "40%",
                marginBottom: "3vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent:"flex-end"
              }}
            >
              <Typography variant="body1" sx={{ marginBottom: 0, fontSize: "15px", color: "grey" }}>
                Загрузить фото
              </Typography>
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                  accept="image/*"
                />
                <Button
                  variant="outlined"
                  component="span"
                  sx={{
                    color: "#729CDB",
                    borderColor: "#729CDB",
                    transition: "color 0.3s, border-color 0.3s",
                    "&:hover": {
                      color: "#204276",
                      borderColor: "#204276",
                    },
                  }}
                >
                  Загрузить
                </Button>
              </label>
            </Container>
          </div>



          <div style={{ width: "40%", marginBottom: "3vh" }}>
            <Typography variant="body1" sx={{ marginBottom: 0, fontSize: "15px", color: "grey" }}>
              Возрастное ограничение
            </Typography>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TextField
                type="number"
                inputProps={{ min: 0, max: 120 }}
                sx={{
                  width: "5vw",
                  borderTop: "1px solid white",
                  borderLeft: "1px solid white",
                  borderBottom: "1px solid black",
                  borderRight: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <Typography variant="body1" sx={{ marginLeft: "1vw", marginRight: "1vw" }}>
                лет
              </Typography>
            </div>
          </div>
          <div style={{ width: "40%", marginBottom: "3vh" }}>
            <Typography variant="body1" sx={{ marginBottom: 0, fontSize: "15px", color: "grey" }}>
              Плата за вход
            </Typography>
            <TextField type="text" placeholder="Введите плату за вход" fullWidth />
          </div>
          <div style={{ width: "100%", marginBottom: "3vh" }}>
            <Typography variant="body1" sx={{ marginBottom: 0, fontSize: "15px", color: "grey" }}>
              Описание
            </Typography>
            <TextField type="text" placeholder="Введите описание" fullWidth />
          </div>
        </form>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "5vh",
            marginBottom: "10vh",
          }}
        >
          <Button
            variant="contained"

            sx={{
              color: "black",
              backgroundColor: "#729CDB",
              transition: "color 0.3s, border-color 0.3s",
              width: "25%",
              
              "&:hover": {
                color: "white",
                backgroundColor: "#204276",
              },
            }}
          >
            Создать
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CreateEventPage;
import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Checkbox, FormControlLabel, Button, Input} from "@mui/material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CompanyHeader from "../../components/headers/СompanyHeader";
import { getPlaces,postPlace } from "../../api/placesApi";
import { postEvent } from "../../api/eventsApi";
import Autocomplete from '@mui/material/Autocomplete';
import StarIcon from '@mui/icons-material/Star';
import moment from 'moment';


const CreateEventPage = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [ageRestriction, setAgeRestriction] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [entranceFee, setEntranceFee] = useState(0);
  const [places, setPlaces] = useState([]);
  const [rating, setRating] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  console.log("123");


  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await getPlaces();
        setPlaces(response.data);
      } catch (error) {
      }
    };

    fetchPlaces();
  }, []);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleStartDateChange = (date) => setStartDate(date);
  const handleEndDateChange = (date) => setEndDate(date);
  const handleAgeRestrictionChange = (event) => setAgeRestriction(parseInt(event.target.value));
  const handleAddressChange = (event) => setAddress(event.target.value);
  const handleEntranceFeeChange = (event) => setEntranceFee(event.target.value);

  const handleNameChange = (event, value) => {
    setName(value);

    const selectedPlace = places.find(place => place.name === value);
    setSelectedPlace(selectedPlace);

    if (selectedPlace) {
      setAddress(selectedPlace.address);
      console.log("rating");
      if (selectedPlace.placeReviews && selectedPlace.placeReviews.length > 0) {
        const averageRating = selectedPlace.placeReviews.reduce((sum, review) => sum + review.grade, 0) / selectedPlace.placeReviews.length;
        setRating(averageRating.toFixed(1));
        console.log("rating");
      } else {
        setRating(null);
      }
    } else {
      setAddress("");
      setRating(null);
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    let placeId = selectedPlace ? selectedPlace.id : null;

    // If the place is new (not selected from the autocomplete list), create it first
    if (!placeId && name && address) {
      try {
        const response = await postPlace({ name, address });
        placeId = response.data.id;
      } catch (error) {
        console.error("Failed to create new place", error);
        return;
      }
    }

    // Prepare event data
    const eventData = {
      title,
      description,
      startDate,
      endDate,
      ageRestriction,
      entranceFee: entranceFee || null,
      placeId: placeId || null,
      onlineEvent: placeId === null ? false : true,
      free: entranceFee === null ? false : true,
    };
    

    try {
      await postEvent(eventData);
      // Optionally, redirect or show success message
      window.location.reload();
    } catch (error) {
      console.error("Failed to create event", error);
    }
  };

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
          <div style={{  marginBottom: "3vh" }}>
            <Typography variant="body1" sx={{ marginBottom: 0, fontSize: "15px", color: "grey" }}>
              Название
            </Typography>
            <TextField type="text" placeholder="Введите название мероприятия" fullWidth onChange={handleTitleChange} value={title}/>
          </div>
          <div 
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "3vh",
            }}
          >
            <div style={{ width: "40%" }}>
              <Typography variant="body1" sx={{ marginBottom: 0, fontSize: "15px", color: "grey" }}>
                Дата проведения и время
              </Typography>
              <DateTimePicker fullWidth onChange={handleStartDateChange} value={startDate} disablePast maxDate={moment(endDate)}/>
            </div>
            <div style={{ width: "30%" }}>
              <Typography variant="body1" sx={{ marginBottom: 0, fontSize: "15px", color: "grey" }}>
              Дата окончания и время
              </Typography>
              <DateTimePicker fullWidth onChange={handleEndDateChange} value={endDate}
              minDate={moment(startDate)} disablePast/>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "40%", marginBottom: "3vh" }}>
            <Typography variant="body1" sx={{ marginBottom: 0, fontSize: "15px", color: "grey" }}>
              Место проведения
            </Typography>
            <Autocomplete
              freeSolo
              options={places}
              getOptionLabel={(option) => option.name}
              onInputChange={handleNameChange}
              renderInput={(params) => <TextField {...params} placeholder="Название" fullWidth />}
            />
            {rating !== null && (
              <div style={{ marginLeft: "1vw", marginTop: "0.5vh", display: "flex", alignItems: "center" }}>
                <Typography variant="body1" sx={{ fontSize: "15px", color: "grey", display: "flex", alignItems: "center" }}>
                    Рейтинг: {rating} <StarIcon sx={{ fontSize:"18px", color: "gold", marginBottom:"0.4vh" }} />
                  </Typography>
              </div>
            )}
            <TextField placeholder="Адрес" fullWidth sx={{ marginTop: "2vh"}} onChange={handleAddressChange} 
            value={address}/>
          </div>
          <Container
              sx={{
                width: "40%",
                marginBottom: "3vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent:"flex-end",
                marginRight:0
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
                  width: "30%",
                }}
                value={ageRestriction}
                onChange={handleAgeRestrictionChange} 
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
            <div style={{ display: "flex", alignItems: "center" }}>
            <TextField type="number"  sx={{ width:"30%"}} onChange={handleEntranceFeeChange} value={entranceFee} />
            <Typography variant="body1" sx={{ marginLeft: "1vw", marginRight: "1vw" }}>
                р.
              </Typography>
              </div>
          </div>
          <div style={{ width: "100%", marginBottom: "3vh" }}>
            <Typography variant="body1" sx={{ marginBottom: 0, fontSize: "15px", color: "grey" }}>
              Описание
            </Typography>
            <TextField type="text" placeholder="Введите описание" fullWidth onChange={handleDescriptionChange} value={description}/>
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
            onClick={handleSubmit}
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
            disabled={!title || !description || !startDate || !endDate || !ageRestriction || (name && !address)}
          >
            Создать
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CreateEventPage;
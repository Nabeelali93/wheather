import React, { useEffect, useState } from "react";
import "@coreui/coreui/dist/css/coreui.min.css";
import {
  CNavbar,
  CNavbarBrand,
  CContainer,
  CFormInput,
  CForm,
  CButton,
} from "@coreui/react";
import axios from "axios";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";

import clear from "./assest/clear.png";

import haze from "./assest/Hasz.png";

import cloud from "./assest/cloud.png";

import dirzzling from "./assest/dirzzling.png";


import rain from "./assest/rain.png";

function App() {
  const [WeatherData, setWeatherData] = useState([]);

  const [weather, setWeather] = useState("");
  let data = [];

  const [val, setval] = useState("");
  const [city, setcity] = useState("karachi");

  const [img, setImg] = useState();

  const handleChange = (e) => {
    setval(e.target.value);
  };
  const handelsubmit = () => {
    setcity(val);
  };

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://pro.openweathermap.org/data/2.5/weather?q=${city}&appid=3500aa8ab775cb0cb97ead2b9fc41866&units=metric`,
      headers: {},
    };

    axios
      .request(config)
      .then(async (response) => {
        // console.log(response.data);
        if (response) {
          data = await response.data;

          setWeatherData(data);

          setWeather(data.weather[0]);
          
          console.log(weather)
        } 
        switch (data.weather[0].main) {
          case "Clouds":
            return setImg(cloud)
            break;

            case "Rain":
            return setImg(rain)
            break;

            case "Rain":
            return setImg(rain)
            break;

        
          default:
            break;
        }




      })
      .catch((error) => {
        console.log(error);
      });
  }, [city]);

  console.log(WeatherData);

  return (
    <>
      <CNavbar colorScheme="light" className="bg-light">
        <CContainer fluid>
          <CNavbarBrand href="#">Navbar</CNavbarBrand>
          <CForm className="d-flex">
            <CFormInput
              type="text"
              className="me-2"
              placeholder="Search"
              onChange={(e) => handleChange(e)}
            />
            <CButton
              onClick={() => handelsubmit()}
              type="button"
              color="success"
              variant="outline"
            >
              Search
            </CButton>
          </CForm>
        </CContainer>
      </CNavbar>
      <br /> <br />
      <br />
      <br />
      {/* 
      <h2 class="card-title">  {WeatherData.name} </h2>


   <h1 class="card-title">Temperature {WeatherData.main.temp} </h1>
   <h2>Feels_Like  {WeatherData.main.feels_like}</h2>
   <h2> Max Temp {WeatherData.main.temp_max}</h2>
   <h2>Wind Speed {WeatherData.wind.speed}</h2> */}
      {WeatherData != "" ? (
        <>
          <Card
            size="lg"
            variant="plain"
            orientation="horizontal"
            sx={{
              margin: "auto",
              textAlign: "center",
              maxWidth: "100%",
              width: 500,
              // to make the demo resizable
              resize: "horizontal",
            }}
          >
            <CardOverflow
              variant="solid"
              color="primary"
              sx={{
                flex: "0 0 200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                px: "var(--Card-padding)",
              }}
            >
              {" "}
              <Typography fontSize="xl4" fontWeight="xl" textColor="#fff">
                {WeatherData.name}
              </Typography>
              <Typography fontSize="xl4" fontWeight="xl" textColor="#fff">
                {WeatherData.main.temp} <sup>o</sup>C
              </Typography>
              <Typography textColor="primary.200">
                Feel_Like : {WeatherData.main.feels_like} <br />
                Max Temp : {WeatherData.main.temp_max}
              </Typography>
            </CardOverflow>
            <CardContent sx={{ gap: 1.5, minWidth: 200 }}>
              <AspectRatio ratio="19/8" objectFit="contain" variant="plain">
                <img alt="." src={img} />
              </AspectRatio>
              <CardContent>
                <Typography level="title-lg">{weather.main}</Typography>
                <Typography fontSize="sm" sx={{ mt: 0.5 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </Typography>
              </CardContent>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  "--variant-borderWidth": "2px",
                  borderRadius: 40,
                  borderColor: "primary.500",
                  mx: "auto",
                }}
              >
                See FAQ
              </Button>
            </CardContent>
          </Card>
        </>
      ) : (
        <>
          <h1>loading!</h1>
        </>
      )}
    </>
  );
}

export default App;

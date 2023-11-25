import React, { useState } from "react";
import "./weatherapp.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

export default function Weatherapp() {
  const [weatherInfo, setWeatherInfo] = useState();
  const [wIcon, setWIcon] = useState();

  const displayIcon = (icon) => {
    switch (icon) {
      case "01d" || "01n":
        setWIcon(clear_icon);
        break;
      case "02d" || "02n":
        setWIcon(clear_icon);
        break;
      case "03d" || "03n":
        setWIcon(drizzle_icon);
        break;
      case "04d" || "04n":
        setWIcon(drizzle_icon);
        break;
      case "09d" || "09n":
        setWIcon(rain_icon);
        break;
      case "10d" || "10n":
        setWIcon(rain_icon);
        break;
      case "13d" || "13n":
        setWIcon(snow_icon);
        break;
      default:
        setWIcon(clear_icon);
    }
  };

  const fetchInfo = async (element) => {
    let weather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${element}&units=Metric&appid=${process.env.REACT_APP_SECRET_API_KEY}`
    );
    let weather_data = await weather.json();
    setWeatherInfo(weather_data);
    displayIcon(weather_data.weather.icon);
  };

  const search = () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    } else {
      fetchInfo(element[0].value);
    }
  };
  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div
          className="searchIcon"
          onClick={() => {
            search();
          }}
        >
          <img src={search_icon} alt="" />
        </div>
      </div>
      {weatherInfo ? (
        <>
          <div className="weather-image">
            {wIcon && <img src={wIcon} alt="" />}
          </div>
          <div className="weather-temp">{weatherInfo.main.temp}</div>
          <div className="weather-location">{weatherInfo.name}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity_icon} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">
                  {weatherInfo.main.humidity + " %"}
                </div>
                <div className="text">humidity</div>
              </div>
            </div>

            <div className="element">
              <img src={wind_icon} alt="" className="icon" />
              <div className="data">
                <div className="wind-speed">
                  {weatherInfo.wind.speed + " km/h"}
                </div>
                <div className="text">wind speed</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="data-container">Please Enter a city</div>
        </>
      )}
    </div>
  );
}

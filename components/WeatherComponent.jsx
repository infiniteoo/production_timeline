import React, { useState, useEffect } from "react";
import axios from "axios";

function WeatherComponent({ apiKey, city }) {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      )
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, [apiKey, city]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { main, weather } = weatherData;
  const temperatureCelsius = main.temp - 273.15;
  const temperatureFahrenheit = (temperatureCelsius * 9) / 5 + 32; // Convert to Fahrenheit
  const weatherDescription = weather[0].description;
  const weatherIcon = weather[0].icon;

  return (
    <div className="weather-component ">
      <img
        width="75px"
        className="ml-1"
        src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
        alt="Weather Icon"
      />
      <p className="text-center text-3xl">
        {Math.round(temperatureFahrenheit)}°F
      </p>
      <p>{weatherDescription}</p>
    </div>
  );
}

export default WeatherComponent;

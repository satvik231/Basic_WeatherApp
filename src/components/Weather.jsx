import React, { useEffect, useRef, useState } from "react";
import "../components/Weather.css";
import Search_icon from "../assets/search.png";
import Clear_icon from "../assets/clear.png";
import Cloud_icon from "../assets/cloud.png";
import Drizzle_icon from "../assets/drizzle.png";
import Humidity_icon from "../assets/humidity.png";
import Rain_icon from "../assets/rain.png";
import Snow_icon from "../assets/snow.png";
import Wind_icon from "../assets/wind.png";
const Weather = () => {
  const [weatherData, setweatherData] = useState(false);
  const inputRef = useRef();
  const allIcons = {
    "01d": Clear_icon,
    "01n": Clear_icon,
    "02d": Cloud_icon,
    "02n": Cloud_icon,
    "03d": Cloud_icon,
    "03n": Cloud_icon,
    "04d": Drizzle_icon,
    "04n": Drizzle_icon,
    "09d": Rain_icon,
    "09n": Rain_icon,
    "10d": Rain_icon,
    "10n": Rain_icon,
    "13d": Snow_icon,
    "13n": Snow_icon,
  };
  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_WEATHER_API
      }`;
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      const icons = allIcons[data.weather[0].icon];
      setweatherData({
        location: data.name,
        temperatuer: Math.floor(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: icons,
      });
    } catch (error) {
      setweatherData(false);
      console.log(`API ERROR:-${error}`);
    }
  };
  useEffect(() => {
    search("Mumbai");
  }, []);
  return (
    <div className="Weather">
      <div className="searchbar">
        <input type="text" placeholder="Enter here" ref={inputRef} />
        <img
          src={Search_icon}
          alt=""
          onClick={() => {
            search(inputRef.current.value);
          }}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather_icon" />
          <p className="temperature">{weatherData.temperatuer}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather_data">
            <div className="col">
              <img src={Humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={Wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;

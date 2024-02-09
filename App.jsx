import { useState, useEffect } from "react";
import "./App.css";
import search_icon from "./Assets/search.png";
import wind_icon from "./Assets/wind.png";
import clear_icon from "./Assets/clear.png";
import cloud_icon from "./Assets/cloud.png";
import drizzle_icon from "./Assets/drizzle.png";
import humidity_icon from "./Assets/humidity.png";
import rain_icon from "./Assets/rain.png";
import snow_icon from "./Assets/snow.png";
import lightbulb from "./Assets/light-bulb.png";
import yourlocation from "./Assets/yourlocation.png";
import lightmode from "./Assets/light-mode.png";

function App() {
  const searchtwo = () => {
    // Implementation to get user's current location
    navigator.geolocation.getCurrentPosition((position) => {
      // Extract latitude and longitude
      const { latitude, longitude } = position.coords;

      // Add logic to use the obtained location data
      fetchWeatherData(latitude, longitude);
    });
  };

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${api_key}`;

      let response = await fetch(url);
      let data = await response.json();

      // Now you have the weather data for the user's location
      // Extract the location name and temperature
      const locationName = data.name;
      const temperature = data.main.temp;

      // Update the UI with the location name and temperature
      const locationElement =
        document.getElementsByClassName("weatherLocation")[0];
      locationElement.innerHTML = `${locationName}`;

      const temperatureElement =
        document.getElementsByClassName("weathertemp")[0];
      temperatureElement.innerHTML = `${temperature}&deg;C`;

      // You can also update other UI elements or perform any other actions here
    } catch (error) {
      console.error("Error fetching weather data:", error);
      // Handle errors appropriately
    }
  };

  let api_key = "8e9fdc8b91f3e5da13563321e92c686f";
  const [wicon, setwicon] = useState(cloud_icon);
  const [suggest, setSuggest] = useState("");

  const search = async () => {
    const element = document.getElementsByClassName("cityinput");
    if (element[0].value === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

    let response = await fetch(url);
    let data = await response.json();
    const humidity = document.getElementsByClassName("humidityPercentage");
    const wind = document.getElementsByClassName("windRate");
    const temperature = document.getElementsByClassName("weathertemp");
    const location = document.getElementsByClassName("weatherLocation");

    humidity[0].innerHTML = data.main.humidity + " %";
    wind[0].innerHTML = Math.trunc(data.wind.speed) + " km/h";
    temperature[0].innerHTML = data.main.temp + "&deg;";
    location[0].innerHTML = data.name;
    const inCelsius = data.main.temp;
    if (inCelsius < 0) {
      setSuggest("Wear Thick! Snow Outside");
    } else if (inCelsius < 10 && inCelsius > 0) {
      setSuggest("Wear extra Layer of jacket ");
    } else if (inCelsius < 20 && inCelsius > 10) {
      setSuggest(
        "remove Extra Jacket and Wear Thick But Layering May Not Be The Good Option Today"
      );
    } else if (inCelsius < 30 && inCelsius > 20) {
      setSuggest(
        "Prefer For Outdoor Activities and Tshirt and Casual is good Option"
      );
    } else if (inCelsius < 40 && inCelsius > 30) {
      setSuggest("comfortable shorts is good idea for todays outfits");
    }
    if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
      setwicon(clear_icon);
    } else if (
      data.weather[0].icon === "02d" ||
      data.weather[0].icon === "02n"
    ) {
      setwicon(cloud_icon);
    } else if (
      data.weather[0].icon === "03d" ||
      data.weather[0].icon === "03n"
    ) {
      setwicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "04d" ||
      data.weather[0].icon === "04n"
    ) {
      setwicon(drizzle_icon);
    } else if (
      data.weather[0].icon === "09d" ||
      data.weather[0].icon === "09n"
    ) {
      setwicon(rain_icon);
    } else if (
      data.weather[0].icon === "10d" ||
      data.weather[0].icon === "10n"
    ) {
      setwicon(rain_icon);
    } else if (
      data.weather[0].icon === "13d" ||
      data.weather[0].icon === "13n"
    ) {
      setwicon(snow_icon);
    } else {
      setwicon(clear_icon);
    }
  };

  return (
    <>
      <div
        id="wholepage"
        className={`wholepage flex bg-gradient-to-r from-green-400 to-blue-500 h-[650px] w-[750px] rounded-lg outline-none 
          `}
      >
        <div
          id="main"
          className="conatiner mb-40 box-shadow: 0 25px 50px -12px rgb(255 0 0 / 0.25);   w-[550px] h-[600px] mt-[45px] m-auto   rounded-3xl p-3  "
        >
          <div className="topbar flex justify-center gap-4 p-3 ">
            <input
              className="cityinput bg-[#ebfffc] outline-none border-none w-full text-black font-semibold text-2xl p-3 rounded-full"
              type="text"
              placeholder="search"
            />
            <div
              onClick={() => {
                search();
              }}
              className="searchicon flex justify-center items-center w-[78px] h-[78px] bg-[#ebfffc] cursor-pointer rounded-full  "
            >
              <img src={search_icon} alt="" />
            </div>
          </div>
          <div className="weatherimage mt-7 flex justify-center">
            <img src={wicon} alt="" />
          </div>
          <div className="weathertemp flex justify-center text-white text-3xl font-bold ">
            24&deg;
          </div>
          <div className="weatherLocation flex justify-center text-white text-2xl font-bold">
            London
          </div>
          <div className="suggestme mt-2 mb-2">
            <p id="suggestions" className=" font-semibold">
              {suggest}
            </p>
          </div>
          <div className="dataContainer mt-12 text-white flex justify-center ">
            <div className="element m-auto flex items-start gap-3 ">
              <img src={humidity_icon} alt="" className="icon mt-3" />
              <div className="data font-bold text-2xl">
                <div className="humidityPercentage">64%</div>
                <div className="text text-2xl font-bold ">Humidity</div>
              </div>
            </div>
            <div className="element m-auto flex items-start gap-3 ">
              <img src={wind_icon} alt="" className="icon mt-3" />
              <div className="data font-bold text-2xl">
                <div className="windRate">18 km/h</div>
                <div className="text text-2xl font-bold ">wind Speeed</div>
              </div>
            </div>
          </div>
        </div>
        <div className="sidearea flex justify-center  mt-[30px] p-3">
          <div className="  sidebar h-[550px] w-[130px] p-4 bg-blue-300 shadow-2xl rounded-full ">
            <div className="bars flex flex-col justify-between gap-[100px] rounded-lg  ">
              <button
                onClick={searchtwo}
                className="darkMode rounded-full p-3 hover:scale-110 hover: bg-green-100  outline-none border-none"
              >
                <img className=" o" src={yourlocation} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

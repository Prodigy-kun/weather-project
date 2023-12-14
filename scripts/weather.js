// 6a33e7afcd960815147a04e78bc16bd1
import { outputWeather } from "./weatherData.mjs";
import { getCoordinatesFromCity, getLocalStorage, darkMode } from "./utils.mjs";
import { successCallback, errorCallback } from "./currentLocationgetter.mjs";
import { renderForecast } from "./forecast.mjs";
// let valueHolder = [""];
const selector = ".current-city";
const form = document.querySelector("#location-form");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  document.querySelector(selector).innerHTML = "";
  const locationValue = document.getElementById("locator").value;

  try {
    outputWeather(selector, locationValue);

    const coordinateResult = await getCoordinatesFromCity(locationValue);
    // console.log(coordinateResult);
    renderForecast(coordinateResult[0].lat, coordinateResult[0].lon);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
});

// current location implementation
document.addEventListener("DOMContentLoaded", function () {
  const geoLocationRequested = localStorage.getItem("notFirstTime");
  if (!geoLocationRequested) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      alert("Geolocation is not supported by this browser");
    }
  } else {
    const coordinates = getLocalStorage("currentLocation");
    getWeatherByCoordinates(coordinates[0], coordinates[1]);
  }
});
document.querySelector(".darkModeBtn").addEventListener("click", darkMode);

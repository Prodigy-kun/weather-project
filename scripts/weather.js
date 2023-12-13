// 6a33e7afcd960815147a04e78bc16bd1
import { outputWeather } from "./weatherData.mjs";
import {
  successCallback,
  getLocalStorage,
  getWeatherByCoordinates,
} from "./currentLocationgetter.mjs";
import { renderForecast } from "./forecast.mjs";
let valueHolder = [""];
const selector = ".current-city";
const form = document.querySelector("#location-form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  document.querySelector(selector).innerHTML = "";
  const locationValue = document.getElementById("locator").value;
  valueHolder.pop();
  valueHolder.push(locationValue);
  outputWeather(selector, locationValue);

  console.log(valueHolder[0]);
  renderForecast(".forecast-container", locationValue);
});
console.log(valueHolder);
// current location implementation
document.addEventListener("DOMContentLoaded", function () {
  const geoLocationRequested = localStorage.getItem("notFirstTime");
  if (!geoLocationRequested) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback);
    } else {
      alert("Geolocation is not supported by this browser");
    }
  } else {
    const coordinates = getLocalStorage("currentLocation");
    getWeatherByCoordinates(coordinates[0], coordinates[1]);
    console.log(locationValue);
  }
});

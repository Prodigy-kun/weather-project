import { currentWeatherTemplate } from "./weatherData.mjs";
import { fetchWeatherData, setLocalStorage } from "./utils.mjs";
import { renderForecast } from "./forecast.mjs";

export function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitutde = position.coords.longitude;
  // console.log(`longitude: ${longitutde}, latitude: ${latitude}`);
  const positionList = [latitude, longitutde];
  getWeatherByCoordinates(latitude, longitutde);
  // renderForecast(latitude, longitutde);
  setLocalStorage("geolocationRequested", true);
  setLocalStorage("currentLocation", positionList);
}
// Add error callback for geolocation
export function errorCallback(error) {
  console.error("Geolocation error:", error.message);
}

export async function getWeatherByCoordinates(lat, long) {
  // console.log(lat, long);
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=6a33e7afcd960815147a04e78bc16bd1`;
  // console.log(url);
  renderForecast(lat, long);
  const weatherData = await fetchWeatherData(url);
  const builtData = currentWeatherTemplate(weatherData);
  document
    .querySelector(".current-city")
    .insertAdjacentHTML("afterbegin", builtData);
}

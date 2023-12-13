import { fetchWeatherData, currentWeatherTemplate } from "./weatherData.mjs";

export function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitutde = position.coords.longitude;
  // console.log(`longitude: ${longitutde}, latitude: ${latitude}`);
  const positionList = [latitude, longitutde];
  getWeatherByCoordinates(latitude, longitutde);
  setLocalStorage("geolocationRequested", true);
  setLocalStorage("currentLocation", positionList);
}
export async function getWeatherByCoordinates(lat, long) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=6a33e7afcd960815147a04e78bc16bd1`;
  const weatherData = await fetchWeatherData(url);
  const builtData = currentWeatherTemplate(weatherData);
  document
    .querySelector(".current-city")
    .insertAdjacentHTML("afterbegin", builtData);
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

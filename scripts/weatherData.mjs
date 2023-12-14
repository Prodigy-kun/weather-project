// const apiPathForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=ife&appid=6a33e7afcd960815147a04e78bc16bd1&units=metric'
// const apiid = 6a33e7afcd960815147a04e78bc16bd1
import {
  fetchWeatherData,
  convertTimeFromUNIXToHuman,
  getCoordinatesFromCity,
} from "./utils.mjs";
export async function outputWeather(parent, location) {
  try {
    const coordinateResult = await getCoordinatesFromCity(location);
    const readyData = await searchLocationAndBuild(coordinateResult);
    document.getElementById("locator").value = "";
    document.querySelector(parent).insertAdjacentHTML("afterbegin", readyData);
  } catch (error) {
    console.error("Error displaying weather:", error.message);
  }
}

async function searchLocationAndBuild(coordinateResult) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinateResult[0].lat}&lon=${coordinateResult[0].lon}&units=metric&appid=6a33e7afcd960815147a04e78bc16bd1`;
    const weatherData = await fetchWeatherData(url);
    const builtData = currentWeatherTemplate(weatherData);
    return builtData;
  } catch (error) {
    console.error("Error searching location and building:", error.message);
  }
}

export function currentWeatherTemplate(data) {
  const html = `
    <div class="about">
    <h1 class="city-name">${data.name}</h1>
    <img src="https://openweathermap.org/img/w/${
      data.weather[0].icon
    }.png" alt="weather condition icon">
    <h3 class="weather-description">Description: <strong>${
      data.weather[0].description
    }</strong></h3>
</div>

<!-- to add map of the location later
forcast and when the forecast is clicked it will display info as in weather data -->
<div class="weatherdata">
    <div>
        <img src="images/icons8-thermometer-48.png" alt="">
        <p class="temp">Temperature: ${data.main.temp}°C</p>
        <p class="temp-feel">Feels Like: ${data.main.feels_like}°C</p>
    </div>

    <div>
        <img src="images/icons8-water-48.png" alt="">
        <p class="humidity">Humidty: ${data.main.humidity}%</p>
    </div>

    <div>
        <img src="images/icons8-wind-48.png" alt="">
        <p class="wind"> wind speed: ${data.wind.speed}km/hr</p>
    </div>


    <div>
        <img src="images/icons8-sunrise-64.png" alt="sunrise icon">
        <p class="sunrise">Sunrise: ${convertTimeFromUNIXToHuman(
          `${data.sys.sunrise}`
        )}</p>
    </div>
    <div>
        <img src="images/icons8-sunset-48.png" alt="sunset icon">
        <p class="sunset">Sunrise: ${convertTimeFromUNIXToHuman(
          `${data.sys.sunset}`
        )}</p>
    </div>
</div>`;
  return html;
}

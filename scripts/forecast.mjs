import {
  fetchWeatherData,
  convertTimeFromUNIXToHuman,
} from "./weatherData.mjs";

export async function renderForecast(parent, location) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=6a33e7afcd960815147a04e78bc16bd1`;
  const forecastResult = await fetchWeatherData(url);
  // console.log(forecastResult.list[0]);
  forecastResult.list
    .slice()
    .reverse()
    .forEach((listItem) => {
      // console.log(`item: ${listItem}`);
      let htmlFormat = forecastTemplate(listItem);
      document
        .querySelector(parent)
        .insertAdjacentHTML("afterbegin", htmlFormat);
    });
}

function forecastTemplate(data) {
  const html = `
    <div class="forecast">
        <p>${convertTimeFromUNIXToHuman(data.dt)}</p>
        <p>${convertTimeFromUNIXToHuman(data.dt, true)}</p>
        <img src="https://openweathermap.org/img/w/${
          data.weather[0].icon
        }.png" alt=${data.weather[0].description}>
        <h3>${data.main.temp}°C</h3>
        <p>${data.weather[0].main}</p>
    </div>`;
  return html;
}

import { fetchWeatherData, convertTimeFromUNIXToHuman } from "./utils.mjs";

export async function renderForecast(latitude, longitude) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=6a33e7afcd960815147a04e78bc16bd1`;

  try {
    const forecastResult = await fetchWeatherData(url);
    const container = document.querySelector(".forecast-container");

    forecastResult.list
      .slice()
      .reverse()
      .forEach((listItem) => {
        try {
          let htmlFormat = forecastTemplate(listItem);

          container.insertAdjacentHTML("afterbegin", htmlFormat);
        } catch (error) {
          console.error("Error creating forecast template:", error.message);
          // Handle or log the error as needed
        }
      });
  } catch (error) {
    console.error("Error fetching weather forecast:", error.message);
  }
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

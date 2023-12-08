// const apiPathForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=ife&appid=6a33e7afcd960815147a04e78bc16bd1&units=metric'
// const apiPatWeather=``
async function fetchWeatherData(url) {
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}
export async function outputWeather(parent, location) {
  const readyData = await searchLocationAndBuild(location);
  document.querySelector(parent).insertAdjacentHTML("afterbegin", readyData);
}
async function searchLocationAndBuild(location) {
  //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6a33e7afcd960815147a04e78bc16bd1&units=metric'`;
  const weatherData = await fetchWeatherData(url);
  const builtData = currentWeatherTemplate(weatherData);
  return builtData;
}
function convertTimeFromUNIXToHuman(time) {
  const date = new Date(time * 1000);
  let hour = date.getHours().toString().padStart(2, "0");
  if (hour > 12) {
    hour = hour - 12;
  }
  const min = date.getMinutes().toString().padStart(2, "0");
  return `${hour}:${min}`;
}
function currentWeatherTemplate(data) {
  const html = `<h2 class="city-name">${data.name}</h2>
    <img src="https://openweathermap.org/img/w/${
      data.weather[0].icon
    }.png" alt="weather condition icon">
    <h3 class="weather-description">${data.weather[0].description}</h3>
    <!-- to add map of the location later -->
    <!-- forcast and when the forecast is clicked it will display info as in weather data -->
    <div id="weatherdata">
        <p class="temp">Temperature: ${data.main.temp}</p>
        <p class="temp-feel">Feels Like: ${data.main.feels_like}</p>
        <p class="humidity">Humidity: ${data.main.humidity}</p>
        <p class="wind">Wind Speed: ${data.wind.speed}</p>
        <div class="sun">
            <p class="sunrise">${convertTimeFromUNIXToHuman(
              `${data.sys.sunrise}`
            )}AM</p>
            <p class="sunset">${convertTimeFromUNIXToHuman(
              `${data.sys.sunset}`
            )}PM</p>
        </div>

    </div>`;
  return html;
}

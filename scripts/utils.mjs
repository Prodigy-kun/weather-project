export function convertTimeFromUNIXToHuman(time, getDay = false) {
  try {
    const date = new Date(time * 1000);
    const min = date.getMinutes().toString().padStart(2, "0");
    let hour = date.getHours().toString().padStart(2, "0");

    if (!getDay) {
      if (hour > 12) {
        hour = hour - 12;
        return `${hour}:${min}PM`;
      }
      return `${hour}:${min}AM`;
    } else {
      const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
      return dayOfWeek;
    }
  } catch (error) {
    console.error("Error converting time:", error.message);
  }
}

export async function getCoordinatesFromCity(city) {
  try {
    const coordinate = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=6a33e7afcd960815147a04e78bc16bd1`;
    const coordinateResult = await fetchWeatherData(coordinate);
    return coordinateResult;
  } catch (error) {
    console.error("Error getting coordinates:", error.message);
  }
}

export async function fetchWeatherData(url) {
  const res = await fetch(url);
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function darkMode() {
  document.querySelector("main").classList.toggle("darkmode");
  document.querySelector(".darkModeBtn").classList.toggle("showindark");
}

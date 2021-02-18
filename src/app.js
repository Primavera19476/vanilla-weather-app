/*Search engine
API integration
unit conversion
wind speed
precipitation
weather description
and weather icon are mandatory.
The forecast is optional */

// Format Date //
function formatDate (dateValue) {
  let hours = dateValue.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = dateValue.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let dayIndex = days[dateValue.getDay()];

  let now = `${dayIndex}, ${hours}:${minutes}`;
  return now;
}

let dateElement = document.querySelector("#day-element");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Search-Bar Input //
function search (event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "e43b0a6cd655b887c6853a81917a0cda";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  console.log (apiUrl);
  axios.get(apiUrl).then(displayWeatherMain);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// display weather // 
function displayWeatherMain (response) {
  console.log (response);
  let temperatureElementMain = document.querySelector ("#temperature-Main");
  temperatureElementMain.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#current-City").innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#windspeed").innerHTML = Math.round(response.data.wind.speed);
}
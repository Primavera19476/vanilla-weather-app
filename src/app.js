/*
💯Search engine 
💯API integration 
💯unit conversion
💯wind speed 
💯precipitation 
💯weather description 
💯and weather icon are mandatory. 
convert Windspeed to mpH
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
function search (city) {
  let apiKey = "e43b0a6cd655b887c6853a81917a0cda";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  console.log (apiUrl);
  axios.get(apiUrl).then(displayWeatherMain);
}

function handleSubmit (event) {
  event.preventDefault ();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Vienna");

// display weather // 
function displayWeatherMain (response) {
  console.log (response);
  celciusTemperature = (response.data.main.temp);
  celciusTemperatureFeelsLike = (response.data.main.feels_like);
  kmhWindspeed = (response.data.wind.speed);
  let temperatureElementMain = document.querySelector ("#temperature-Main");
  temperatureElementMain.innerHTML = Math.round(celciusTemperature);
  document.querySelector("#current-City").innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = Math.round(celciusTemperatureFeelsLike);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#windspeed").innerHTML = Math.round(kmhWindspeed);
  document.querySelector("#icon-main").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#icon-main").setAttribute("alt", response.data.weather[0].description);
  let dateElement = document.querySelector("#day-element");
  let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);
}

// Convert Units //
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElementMain = document.querySelector ("#temperature-Main");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celciusTemperature *9)/5+32;
  temperatureElementMain.innerHTML = Math.round(fahrenheitTemperature);
  
  let feelsLikeElement = document.querySelector ("#feels-like");
  let fahrenheitTemperatureFeelsLike = (celciusTemperatureFeelsLike *9)/5+32;
  feelsLikeElement.innerHTML = Math.round(fahrenheitTemperatureFeelsLike);
  document.querySelector("#feels-like-unit").innerHTML = "F";
  
  let windspeedElement = document.querySelector ("#windspeed");
  let mphWindspeed = (kmhWindspeed)/1.609;
  windspeedElement.innerHTML = Math.round(mphWindspeed);
  document.querySelector("#windspeed-unit").innerHTML = "mph";
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElementMain = document.querySelector ("#temperature-Main");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElementMain.innerHTML = Math.round(celciusTemperature);
  
  let feelsLikeElement = document.querySelector ("#feels-like");
  feelsLikeElement.innerHTML = Math.round(celciusTemperatureFeelsLike);
  document.querySelector("#feels-like-unit").innerHTML = "C";
  
  let windspeedElement = document.querySelector ("#windspeed");
  windspeedElement.innerHTML = Math.round(kmhWindspeed);
  document.querySelector("#windspeed-unit").innerHTML = "km/h";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");

celsiusLink.addEventListener("click", convertToCelsius);
document.querySelector("#feels-like-unit").innerHTML = "C";
document.querySelector("#windspeed-unit").innerHTML = "km/h";
let celciusTemperature = null;
let celciusTemperatureFeelsLike = null;
let kmhWindspeed = null;

// Forecast //

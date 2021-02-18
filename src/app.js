/*Search engine
API integration
unit conversion
wind speed
precipitation
weather description
and weather icon are mandatory.
The forecast is optional */

function displayWeatherMain (response) {
  console.log (response);
  let temperatureElementMain = document.querySelector ("#temperature-Main");
  temperatureElementMain.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#current-City").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#humidity").innerHTML = Math.round(response.data.main.humidity);
  document.querySelector("#windspeed").innerHTML = Math.round(response.data.wind.speed);
  
}

let apiKey = "e43b0a6cd655b887c6853a81917a0cda";
let unit = "metric";
let city = "Paris";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

console.log (apiUrl);

axios.get(apiUrl).then(displayWeatherMain);
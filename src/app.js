/*
💯Search engine 
💯API integration 
💯unit conversion
💯wind speed 
💯precipitation 
💯weather description 
💯and weather icon are mandatory. 
💯convert Windspeed to mpH
💯implement daily forecast
convert Forecast units
💯 implement Background-image
💯 The forecast is optional */

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
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let dayIndex = days[dateValue.getDay()];

  let now = `${dayIndex}, ${hours}:${minutes}`;
  return now;
}
let dateElement = document.querySelector("#day-element");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

// Format Day // 
function formatDay (timestamp) {
let dateValue = new Date (timestamp);
 let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let dayIndex = days[dateValue.getDay()];

  let now = `${dayIndex}`;
  return now; 
}

// Format Forecast Hours //
function formatHours (timestamp) {
let dateValue = new Date (timestamp);
    let hours = dateValue.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = dateValue.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Search-Bar Input //
function search (city) {
  let apiKey = "e43b0a6cd655b887c6853a81917a0cda";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeatherMain);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayHourlyForecast);
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
  console.log(response);
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
  let descriptionGIF =  response.data.weather[0].icon;
  console.log(descriptionGIF);
  console.log (response.data.weather[0].main);
  let dateElement = document.querySelector("#day-element");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);

  let cityLatitude = (response.data.coord.lat);
  let cityLongitude = (response.data.coord.lon);
  
  let apiKey = "e43b0a6cd655b887c6853a81917a0cda";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&exclude=current,minutely,hourly,alerts&units=${unit}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayDailyForecast);

  // Change Icon //
  if  (descriptionGIF === "01d") {
  document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/xUPGcjDsJA9Ki3ZqmY" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/fun-summer-sun-xUPGcjDsJA9Ki3ZqmY"></a></p>`;
  } else if (descriptionGIF === "01n") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/l3q2ICbdSmDqnlxC0" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/animation-fun-loop-l3q2ICbdSmDqnlxC0"></a></p>`;   
  } else if (descriptionGIF === "02d") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/26BGDQxDCZDFHW5Ne" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/animation-loop-sun-26BGDQxDCZDFHW5Ne"></a></p>`;   
  } else if (descriptionGIF === "02n") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:76%;position:relative;"><iframe src="https://giphy.com/embed/l0HU7Cs5D0Gbo7G3S" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/animation-illustration-night-l0HU7Cs5D0Gbo7G3S"></a></p>`;   
  } else if (descriptionGIF === "03d") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/rrFcUcN3MFmta" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/sunglasses-rrFcUcN3MFmta"></a></p>`;   
  } else if (descriptionGIF === "03n") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:76%;position:relative;"><iframe src="https://giphy.com/embed/l0HU7Cs5D0Gbo7G3S" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/animation-illustration-night-l0HU7Cs5D0Gbo7G3S"></a></p>`;   
  } else if (descriptionGIF === "04d") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/rrFcUcN3MFmta" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/sunglasses-rrFcUcN3MFmta"></a></p>`;   
  } else if (descriptionGIF === "04n") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:76%;position:relative;"><iframe src="https://giphy.com/embed/l0HU7Cs5D0Gbo7G3S" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/animation-illustration-night-l0HU7Cs5D0Gbo7G3S"></a></p>`;   
  } else if (descriptionGIF === "09d") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/7zSIC0roM238CVTS4u" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/cute-aww-eyebleach-7zSIC0roM238CVTS4u"></a></p>`;   
  } else if (descriptionGIF === "09n") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:41%;position:relative;"><iframe src="https://giphy.com/embed/l0HlPtBCscbYiLfR6" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/nowthatsmusic-now-thats-what-i-call-music-60-l0HlPtBCscbYiLfR6"></a></p>`;   
  } else if (descriptionGIF === "10d") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/7zSIC0roM238CVTS4u" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/cute-aww-eyebleach-7zSIC0roM238CVTS4u"></a></p>`;   
  } else if (descriptionGIF === "10n") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:41%;position:relative;"><iframe src="https://giphy.com/embed/l0HlPtBCscbYiLfR6" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/nowthatsmusic-now-thats-what-i-call-music-60-l0HlPtBCscbYiLfR6"></a></p>`;   
  } else if (descriptionGIF === "11d") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/26uf5HjasTtxtNCqQ" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/cloud-idiom-steal-your-thunder-26uf5HjasTtxtNCqQ"></a></p>`;   
  } else if (descriptionGIF === "11n") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/26uf5HjasTtxtNCqQ" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/cloud-idiom-steal-your-thunder-26uf5HjasTtxtNCqQ"></a></p>`;   
  } else if (descriptionGIF === "13d") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/uos5sW7pBy5W0" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/digg-what-is-this-ground-uos5sW7pBy5W0"></a></p>`;   
  } else if (descriptionGIF === "13n") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:100%;position:relative;"><iframe src="https://giphy.com/embed/uos5sW7pBy5W0" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/digg-what-is-this-ground-uos5sW7pBy5W0"></a></p>`;   
  } else if (descriptionGIF === "50n") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/l4pT0NtPSMV3pw6Lm" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/scoobydoo-cartoon-scooby-doo-l4pT0NtPSMV3pw6Lm"></a></p>`;   
  } else if (descriptionGIF === "50n") {
   document.querySelector("#weather-gif").innerHTML = `<div style="width:100%;height:0;padding-bottom:75%;position:relative;"><iframe src="https://giphy.com/embed/l4pT0NtPSMV3pw6Lm" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/scoobydoo-cartoon-scooby-doo-l4pT0NtPSMV3pw6Lm"></a></p>`;   
  } 

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

  // Trial: converting Forecast Units //
  //document.querySelector("#hourly-forecast-temperature").innerHTML = (document.querySelector("#hourly-forecast-temperature").innerHTML.value *9)/5+32;
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

// Hourly Forecast //
function displayHourlyForecast (response) {
  let forecastElement = document.querySelector("#forecastHourly");
  forecastElement.innerHTML = null;
  let forecastArray = null;

  for (let index = 0; index < 6; index++) {
  forecastArray = response.data.list[index];
  forecastElement.innerHTML +=`
  <ul class="list-group list-group-flush">
  <li class="list-group-item"> ${formatHours(forecastArray.dt* 1000)}
    <img class="forecastIcon" src="http://openweathermap.org/img/wn/${forecastArray.weather[0].icon}@2x.png" alt="${forecastArray.weather[0].description}">
    <span id="hourly-forecast-temperature"> ${Math.round(forecastArray.main.temp_max)}</span>°
  </li>
    </ul>
    `;
  }
}

// Daily Forecast //

function displayDailyForecast (response) {
  console.log(response);
  let dailyForecastElement = document.querySelector("#forecastDaily");
  dailyForecastElement.innerHTML = null;
  let dailyForecastArray = null;

  for (let index = 1; index < 7; index++) {
  dailyForecastArray = response.data.daily[index];
  dailyForecastElement.innerHTML +=`
    <div class="col-2">
      <h6>
      ${formatDay(dailyForecastArray.dt*1000)}
      </h6>
      <img class="forecastIcon" src="http://openweathermap.org/img/wn/${dailyForecastArray.weather[0].icon}@2x.png" alt="${dailyForecastArray.weather[0].description}">
      <br/>
      <div class="forecast-temperature">
        <strong>△ ${Math.round(dailyForecastArray.temp.max)}</strong>
        <strong>°</strong>
        <br/>
        <span>▽ ${ Math.round(dailyForecastArray.temp.min)}</span>°
      </div>
    </div>
    `;
  }
}



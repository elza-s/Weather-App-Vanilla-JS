// Display current time
function formatDate(timestamp) {
  let now = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[now.getDay()];
  return `${day} ${formatTime(timestamp)}`;
}

function formatTime(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`
}



//Change city on search
let changeCity = document.querySelector("#searchCity");
changeCity.addEventListener("submit", changeName);

let celsiusTemp = null;
let apiKey = "c859cc5005db2af23ee315e1d40f88f0";

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(displayForecast);

}

// Display current temperature
function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  document.querySelector("#currentTemp").innerHTML = `${Math.round(celsiusTemp)}°C`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#dayTime").innerHTML = `Last Updated: ${formatDate(response.data.dt * 1000)}`;

  let icon = document.querySelector("#weatherIcon")
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

// Display Celsius to Fahrenheit as selected
function changeToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#currentTemp");

  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temp.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}
let clickFahrenheit = document.querySelector("#fahrenheit");
clickFahrenheit.addEventListener("click", changeToFahrenheit);


// Display Fahrenheit to Celsius as selected
function changeToCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = `${Math.round(celsiusTemp)}°C
  `;
}

let clickCelsius = document.querySelector("#celsius");
clickCelsius.addEventListener("click", changeToCelsius);


// Changes the city name to the searched name
function changeName(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
  city = ''
}

// Change info with Geolocation
function searchLocation(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

  let apiUrlGeoForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlGeoForecast).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);


// Forcasting weather


function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  console.log(response);

  for (let i = 0; i < 5; i++) {
    forecast = response.data.list[i];
    forecastElement.innerHTML += `
    <div class="col forecastTemp"">
      <p >
        ${formatTime(forecast.dt * 1000)}
      </p >
      <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"/>
      <p><strong>
        ${Math.round(forecast.main.temp_max)}° |
        </strong>
        ${Math.round(forecast.main.temp_min)}°
        </p>
      
    </div > `;
  }
}

search("Sydney");

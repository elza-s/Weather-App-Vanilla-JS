// Display current time
let now = new Date();
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

let hours = now.getHours();
let minutes = now.getMinutes();

let dayHours = document.querySelector("#dayTime");
dayHours.innerHTML = ` ${day}  ${hours}:${minutes}`;

let changeCity = document.querySelector("#currentCity");
changeCity.addEventListener("submit", changeName);

let celsiusTemp = null;

// Display current temperature
function displayWeatherCondition(response) {
  console.log(response.data)
  document.querySelector("#city").innerHTML = response.data.name;
  celsiusTemp = response.data.main.temp;
  document.querySelector("#currentTemp").innerHTML = `${Math.round(celsiusTemp)}°C`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;

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

function search(city) {
  let apiKey = "c859cc5005db2af23ee315e1d40f88f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);

}

function changeName(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  search(city);
}

// change info to current location
function searchLocation(position) {
  let apiKey = "768d5798d6d791324557e57ef0abc21e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Toronto")
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

// Change city name to searched city
// function changeName(event) {
//   event.preventDefault();

//   let search = document.querySelector("#search-input");
//   let city = document.querySelector("#city");
//   city.innerHTML = `${search.value}`;
// }

let changeCity = document.querySelector("#currentCity");
changeCity.addEventListener("submit", changeName);

// Display C/F as selected
// function changeToFahrenheit(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#currentTemp");
//   temp.innerHTML = `61°F`;
// }

// let clickFahrenheit = document.querySelector("#fahrenheit");
// clickFahrenheit.addEventListener("click", changeToFahrenheit);

// function changeToCelsius(event) {
//   event.preventDefault();
//   let temp = document.querySelector("#currentTemp");
//   temp.innerHTML = `16°C`;
// }

// let clickCelsius = document.querySelector("#celsius");
// clickCelsius.addEventListener("click", changeToCelsius);

// adding search city temperature

// function search(city) {
//   let apiKey = "c859cc5005db2af23ee315e1d40f88f0";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${changeCity}&appid=${apiKey}&units=metric`;
//   axios.get(apiUrl).then(displayTem);
// }

//Search specific location 

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = `${Math.round(
    response.data.main.temp)}°C
  `;
}

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

// display current date and time on top

function showCurrentDay(today) {
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	let currentDay = days[today.getDay()];
	let currentDate = today.getDate();
	let currentMonth = months[today.getMonth()];
	let currentYear = today.getFullYear();

	let currentHour = today.getHours();
	if (currentHour < 10) {
		currentHour = `0${currentHour}`;
	}

	let currentMinutes = today.getMinutes();
	if (currentMinutes < 10) {
		currentMinutes = `0${currentMinutes}`;
	}

	return `${currentDay}, ${currentDate}. ${currentMonth} ${currentYear}, ${currentHour}:${currentMinutes}`;
}

let showDate = document.querySelector("#current-date");
let today = new Date();
showDate.innerHTML = showCurrentDay(today);

// search for a city and display weather data

function showCity(city) {
	//Weather API
	let units = "metric";
	let apiKey = "c757ac92a5aa99c5c15eeb0f1937036f";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;

	//get (the URL from the API),
	//when you get the result/response from the API then run (THIS FUNCTION)
	axios.get(apiUrl).then(showTemperature);
}

function searchCity(city) {
	city.preventDefault();

	let searchInput = document.querySelector("#search-input");
	showCity(searchInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

showCity("Vienna");

function showTemperature(response) {
	//city
	let city = document.querySelector("#current-city");
	let apiCity = response.data.name;
	city.innerHTML = apiCity;

	//temperature
	let displayTemp = document.querySelector("#current-temp");
	let apiTemp = Math.round(response.data.main.temp);
	displayTemp.innerHTML = `${apiTemp} °C`;

	//description
	let displayDescription = document.querySelector("#weather-description");
	let apiDescription = response.data.weather[0].description;
	displayDescription.innerHTML = apiDescription;

	//wind
	let displayWind = document.querySelector("#weather-wind");
	let apiWind = Math.round(response.data.wind.speed);
	displayWind.innerHTML = `Wind ${apiWind} km/h`;

	//humidity
	let displayHumid = document.querySelector("#weather-humid");
	let apiHumid = response.data.main.humidity;
	displayHumid.innerHTML = `Humidity ${apiHumid} %`;
}

// geoLocation
function showPosition(position) {
	let lat = position.coords.latitude;
	let lon = position.coords.longitude;

	//Weather API
	let units = "metric";
	let apiKey = "c757ac92a5aa99c5c15eeb0f1937036f";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

	axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

//Change unit from Celsius to Fahrenheit and back

/* 
function changeUnit() {
	let temp = document.querySelector("#current-temp");
	let celsius = "12°C ☀️";
	let fahrenheit = "54°F ☀️";
	let tempBtn = document.querySelector("#temp-btn");

	if (unit === "celsius") {
		temp.innerHTML = fahrenheit;
		unit = "fahrenheit";
		tempBtn.innerHTML = "Show in Celsius";
	} else {
		temp.innerHTML = celsius;
		unit = "celsius";
		tempBtn.innerHTML = "Show in Fahrenheit";
	}
}

let unit = "celsius";
let fahrenheitBtn = document.querySelector("#temp-btn");
fahrenheitBtn.addEventListener("click", changeUnit); 
*/

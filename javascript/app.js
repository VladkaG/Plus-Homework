function showDate(timestamp) {
  let date = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMin = date.getMinutes();
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }

  if (currentHour > 4 && currentHour < 20) {
    document.querySelector("#background-video").src = `./images/day.mp4`;
  } else {
    document.querySelector("#background-video").src = `./images/night.mp4`;
  }

  return `${currentDay} ${currentHour}:${currentMin}`;
}

/*******************************************************************/

let temperatureElement = document.querySelector("#temperature");
let temperature = temperatureElement.innerHTML;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", function (event) {
  event.preventDefault();
  temperatureElement.innerHTML = Math.round(temperature * 1.8 + 32);
});

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", function (event) {
  temperatureElement.innerHTML = temperature;
});

/*******************************************************************/

let apiKey = "5t4badf2211oab190e2bd035f7fefd1a";
let form = document.querySelector("#search-form");
let locationButton = document.querySelector("#location-button");

function search(city) {
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}
debugger;
function displayWeather(response) {
  let iconUrl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/`;
  document.querySelector("h1").innerHTML = response.data.city;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#current-time").innerHTML = showDate(
    response.data.time * 1000
  );
  document.querySelector(
    "#weather-icon"
  ).src = `${iconUrl}${response.data.condition.icon}.png`;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  if (city === "") {
    alert("Write a city");
  } else {
    search(city);
  }
});

locationButton.addEventListener("click", function (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  });
});

search("Kharkiv");

/*******************************************************************/

/*let monMax = document.querySelector("#mon-max");
let monMin = document.querySelector("#mon-min");
let monIcon = document.querySelector("#mon-icon");

let tueMax = document.querySelector("#tue-max");
let tueMin = document.querySelector("#tue-min");
let tueIcon = document.querySelector("#tue-icon");

let wedMax = document.querySelector("#wed-max");
let wedMin = document.querySelector("#wed-min");
let wedIcon = document.querySelector("#wed-icon");

let thurMax = document.querySelector("#thur-max");
let thurMin = document.querySelector("#thur-min");
let thurIcon = document.querySelector("#thur-icon");

let friMax = document.querySelector("#fri-max");
let friMin = document.querySelector("#fri-min");
let friIcon = document.querySelector("#fri-icon");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput.value}&appid=${apiKey}`;
  axios.get(url).then(function (response) {
    let lat = response.data[0].lat;
    let lon = response.data[0].lon;

    let coordUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
    axios.get(coordUrl).then(function (response) {
      monMin.innerHTML = Math.round(response.data.list[0].main.temp_min);
      monMax.innerHTML = Math.round(response.data.list[0].main.temp_max);
      monIcon.src = `https://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`;

      tueMin.innerHTML = Math.round(response.data.list[0].main.temp_min);
      tueMax.innerHTML = Math.round(response.data.list[0].main.temp_max);
      tueIcon.src = `https://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`;

      wedMin.innerHTML = Math.round(response.data.list[0].main.temp_min);
      wedMax.innerHTML = Math.round(response.data.list[0].main.temp_max);
      wedIcon.src = `https://openweathermap.org/img/wn/${response.data.list[0].weather[0].icon}@2x.png`;

      thurMin.innerHTML = Math.round(
        Math.min(
          response.data.list[3].main.temp_min,
          response.data.list[4].main.temp_min,
          response.data.list[5].main.temp_min,
          response.data.list[6].main.temp_min
        )
      );
      thurMax.innerHTML = Math.round(
        Math.max(
          response.data.list[3].main.temp_max,
          response.data.list[4].main.temp_max,
          response.data.list[5].main.temp_max,
          response.data.list[6].main.temp_max
        )
      );
      thurIcon.src = `https://openweathermap.org/img/wn/${response.data.list[6].weather[0].icon}@2x.png`;

      friMin.innerHTML = Math.round(
        Math.min(
          response.data.list[9].main.temp_min,
          response.data.list[11].main.temp_min,
          response.data.list[13].main.temp_min,
          response.data.list[16].main.temp_min
        )
      );
      friMax.innerHTML = Math.round(
        Math.max(
          response.data.list[9].main.temp_max,
          response.data.list[11].main.temp_max,
          response.data.list[13].main.temp_max,
          response.data.list[16].main.temp_max
        )
      );
      friIcon.src = `https://openweathermap.org/img/wn/${response.data.list[14].weather[0].icon}@2x.png`;

      console.log(response.data);
    });
  });
});
*/

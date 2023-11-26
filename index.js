const apiKey = "5cc35928473f3bfb0779cba7fbfc17d8";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const form = document.querySelector(".search");
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIc = document.querySelector(".weather-ic");
const weather = document.querySelector(".weather");
const details = document.querySelector(".details");
const col = document.querySelectorAll(".col");

async function checkwet(city) {
  if (city.length === 0) return;

  document.querySelector(".error").textContent = "";

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  var data = await response.json();
  if (data.cod == "404") {
    document.querySelector(".error").textContent = data.message;
    return;
  }
  console.log(data);
  weather.style.display = "";
  details.style.display = "flex";
  col.forEach((element) => {
    element.style.display = "flex";
  });

  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temp").textContent =
    Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").textContent = data.main.humidity + "%";
  document.querySelector(".wind").textContent = data.wind.speed + "Km/h";

  const iconid = `owf owf-5x owf-${data.weather[0].id}`;

  document.querySelector("#weatheric").className = iconid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkwet(searchBox.value);
});

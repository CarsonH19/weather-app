import "./style.css";

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  const APIKey = "b14c369b787c41d0b1b44344240602";
  const city = document.querySelector(".search-box input").value;

  if (city === "") {
    return;
  }

  fetch(`https://api.weatherapi.com/v1/current.json?key=${APIKey}&q=${city}`, {
    method: "GET",
    mode: "cors",
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.error) {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(".weather-box .humidity span");
      const wind = document.querySelector(".weather-box .wind span");

      // Assuming json.current.condition.icon is "url(//cdn.weatherapi.com/weather/64x64/night/113.png)"
      const relativeUrl = json.current.condition.icon.replace(
        /^\/\//,
        "https://"
      );

      if (relativeUrl) {
        image.src = relativeUrl;        
      } else {
        image.src = '';
      }

      temperature.innerHTML = `${parseInt(
        json.current.condition.temperature
      )}<span>Degrees C</span>`;
      // temperature.innerHTML = `${parseInt(json.current.condition.temperature)}<span>Degrees C</span>`;
      humidity.innerHTML = `${json.current.humidity}%`;
      wind.innerHTML = `${parseInt(json.current.wind_mph)}m/h`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherBox.classList.add('fadeIn');
      weatherDetails.classList.add('fadeIn');
      container.style.height = '590px';

      console.log(json);
    });
});

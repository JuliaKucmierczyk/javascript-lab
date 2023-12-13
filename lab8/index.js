const apiKey = "5e67e2f428065a10d8791a98720540ee";
const weatherContainer = document.getElementById("weatherContainer");
const cityInput = document.getElementById("cityInput");
const addCityButton = document.getElementById("addCity");

let cities = JSON.parse(localStorage.getItem("cities")) || [];

const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const displayWeather = (data) => {
  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weatherCard");
  const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  weatherCard.innerHTML = `
      <h2>${data.name}</h2>
      <img src="${iconUrl}" alt="Pogoda">
      <p>Temperatura: ${data.main.temp}°C</p>
      <p>Wilgotność: ${data.main.humidity}%</p>
      <!-- Tutaj możesz dodać więcej informacji o pogodzie -->
  `;
  weatherContainer.appendChild(weatherCard);
};

const updateWeather = async () => {
  weatherContainer.innerHTML = "";
  for (const city of cities) {
    const weatherData = await fetchWeather(city);
    displayWeather(weatherData);
  }
};

addCityButton.addEventListener("click", () => {
  const city = cityInput.value;
  cities.push(city);
  localStorage.setItem("cities", JSON.stringify(cities));
  cityInput.value = "";
  updateWeather();
});

// Inicjalizacja
updateWeather();

// Automatyczna aktualizacja co 5 minut
setInterval(updateWeather, 300000);

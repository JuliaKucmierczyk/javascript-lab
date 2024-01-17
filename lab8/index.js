const apiKey = "5e67e2f428065a10d8791a98720540ee";
const weatherContainer = document.getElementById("weatherContainer");
const cityInput = document.getElementById("cityInput");
const addCityButton = document.getElementById("addCity");

// Add a common class to all remove buttons
const removeButtonClass = "removeButton";

let cities = JSON.parse(localStorage.getItem("cities")) || [];

const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const displayWeather = (data, city) => {
  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weatherCard");
  const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

  weatherCard.innerHTML = `
      <h2>${data.name}</h2>
      <img src="${iconUrl}" alt="Pogoda">
      <p>Temperatura: ${data.main.temp}°C</p>
      <p>Wilgotność: ${data.main.humidity}%</p>
      <button class="${removeButtonClass}" data-city="${city}">Usuń</button>
  `;
  weatherContainer.appendChild(weatherCard);
};

const updateWeather = async () => {
  weatherContainer.innerHTML = "";
  for (const city of cities) {
    const weatherData = await fetchWeather(city);
    displayWeather(weatherData, city);
  }
};

addCityButton.addEventListener("click", () => {
  if (cities.length < 10) {
    const city = cityInput.value;
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
    cityInput.value = "";
    updateWeather();
  } else {
    alert("You can only add up to 10 weather cards.");
  }
});

// Event listener for remove buttons using event delegation
weatherContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains(removeButtonClass)) {
    const cityToRemove = event.target.getAttribute("data-city");
    cities = cities.filter((city) => city !== cityToRemove);
    localStorage.setItem("cities", JSON.stringify(cities));
    updateWeather();
  }
});

// Inicjalizacja
updateWeather();

// Automatyczna aktualizacja co 5 minut
setInterval(updateWeather, 300000);

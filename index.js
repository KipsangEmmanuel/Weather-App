const form = document.querySelector('form');
const input = document.querySelector('input[type="text"]');
const weatherContainer = document.querySelector('#weather');
let api = '7a44e93bf396102568315d2065bcc930';

const apiKey = 'YOUR_API_KEY'; // Replace with your API key from OpenWeatherMap

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const city = input.value.trim();
  if (!city) return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
      input.value = '';
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      weatherContainer.innerHTML = '<p>Unable to fetch weather data. Please try again later.</p>';
    });
});

function displayWeather(data) {
  const { name, weather, main } = data;

  const weatherCard = `
    <div class="weather-card">
      <div class="weather-card__location">${name}</div>
      <div class="weather-card__temperature">${Math.round(main.temp)}&deg;C</div>
      <div class="weather-card__description">${weather[0].description}</div>
      <div class="weather-card__details">
        <div class="weather-card__detail">Feels like ${Math.round(main.feels_like)}&deg;C</div>
        <div class="weather-card__detail">Humidity ${main.humidity}%</div>
      </div>
      <div class="weather-card__icon"><img src="https://openweathermap.org/img/wn/${weather[0].icon}.png" alt="${weather[0].description}"></div>
    </div>
  `;

  weatherContainer.innerHTML = weatherCard;
}
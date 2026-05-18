const apiKey = "YOUR_API_KEY";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();

  if (city === "") {
    alert("Please enter a city name");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found");
      return;
    }

    displayWeather(data);

  } catch (error) {
    alert("Error fetching data");
    console.log(error);
  }
}

function displayWeather(data) {
  document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
  document.getElementById("temp").innerText = `🌡 Temperature: ${data.main.temp}°C`;
  document.getElementById("desc").innerText = `🌥 Condition: ${data.weather[0].description}`;
  document.getElementById("humidity").innerText = `💧 Humidity: ${data.main.humidity}%`;
  document.getElementById("wind").innerText = `🌬 Wind Speed: ${data.wind.speed} m/s`;

  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  document.getElementById("weatherIcon").src = iconUrl;
}

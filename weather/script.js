async function fetchWeather() {
  const city = document.getElementById("cityInput").value;
  const loading = document.getElementById("loadingText");
  const error = document.getElementById("errorText");
  const card = document.getElementById("weatherCard");

  if (!city) return;

  loading.classList.remove("hidden");
  error.textContent = "";
  card.classList.add("hidden");

  try {
    const apiKey = "2584f727f8c313b5e0167aa79e14bf3e";

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );
    const data = await res.json();

    if (!res.ok) {
      error.textContent = data.message || "City not found";
      return;
    }

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("temp").textContent = data.main.temp + "°C";
    document.getElementById("humidity").textContent = data.main.humidity + "%";
    document.getElementById("description").textContent =
      data.weather[0].description;
    document.getElementById("weatherIcon").src =
      `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    card.classList.remove("hidden");
  } catch (e) {
    error.textContent = "Failed to fetch weather";
  } finally {
    loading.classList.add("hidden");
  }
}

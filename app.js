// console.log ("Hello Thundercats!");

// Main function to retrieve and display the weather
//Asynchronously retreives weather and displays it
async function getAndDisplayWeather() {
  const weatherForecast = await retrieveWeather();
  displayWeather(weatherForecast);
}

// Function to retrieve the weather
async function retrieveWeather() {
  //Send GET request to the meteo weather API. Await the response
  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=GMT&forecast_days=1",
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  //Check if response failed, if so log an error and halt the app
  if (!response.ok) {
    console.error(`Status: ${response.status}`);
    console.error(`Text: ${await response.text()}`);
    return;
  }

  //return the parsed JSON from the response (which contains weather object)
  const data = await response.json();
  return data;
}

//test retrieveWeather with console.log();
// console.log(retrieveWeather);

// Function to update the DOM with the provided weather
function displayWeather(weatherForecast) {
  const weatherElement = document.getElementById("weatherForecast");
  weatherElement.textContent = weatherForecast.daily.weathercode;
  const weatherMinTemp = document.getElementById("weatherMin");
  weatherMinTemp.textContent = `MIN Temp. 🥶  ${weatherForecast.daily.temperature_2m_min} °C`;
  const weatherMaxTemp = document.getElementById("weatherMax");
  weatherMaxTemp.textContent = `MAX Temp. 🥵  ${weatherForecast.daily.temperature_2m_max} °C `;

const weatherIcon = document.getElementById("img");

  if (
    weatherForecast.daily.weathercode == 80 ||
    weatherForecast.daily.weathercode == 81 ||
    weatherForecast.daily.weathercode == 82
  ) {
    weatherElement.textContent = "Take an umbrella! Rainshowers are forecast! 🌧";
    weatherIcon.setAttribute("src", "rain.png")
  } else if (
    weatherForecast.daily.weathercode == 61 ||
    weatherForecast.daily.weathercode == 63 ||
    weatherForecast.daily.weathercode == 65
  ) {
    weatherElement.textContent = "Rain, Rain, go away! ☔";
    weatherIcon.setAttribute("src", "rain.png")
  } else if (weatherForecast.daily.weathercode == 0) {
    weatherElement.textContent = "Lucky you! Clear skies today! ☁";
    weatherIcon.setAttribute("src", "clear.png")
  }else if (weatherForecast.daily.weathercode == 1 || weatherForecast.daily.weathercode == 2 ||weatherForecast.daily.weathercode == 3) {
    weatherElement.textContent = "Mainly clear, partly cloudy, and overcast";
    weatherIcon.setAttribute("src", "clouds.png")
}else if (weatherForecast.daily.weathercode == 51 || weatherForecast.daily.weathercode == 53 ||weatherForecast.daily.weathercode == 55) {
  weatherElement.textContent = "Urgh! Drizzle, drizzle!";
  weatherIcon.setAttribute("src", "drizzle1.png")
}

}

// Waits for the DOM to be fully loaded and then displays the weather
document.addEventListener("DOMContentLoaded", getAndDisplayWeather);

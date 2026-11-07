import { displayWeatherDetails }
from "./js/weatherDetails.js";

document.addEventListener("weather:update", (event)=>{
    const weather = event.detail;
    displayWeatherDetails(weather);
});

async function updateWeather(cityName) {
    try {
        const weather = await getWeather(cityName);

        document.dispatchEvent(
            new CustomEvent("weather:update", {
                detail: weather
            })
        );

    } catch (error) {
        console.error(error.message);
    }
}

// Test avec Marrakech
updateWeather("Marrakech");
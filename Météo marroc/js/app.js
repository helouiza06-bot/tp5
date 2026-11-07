import {getWeather } 
from "./js/weatherService.js";
import { displayWeatherDetails }
from "./js/weatherDetails.js";

document.addEventListener("weather:update", (event)=>{
    const weather = event.detail;
    displayWeatherDetails(weather);
});

async function updateWeather(name) {
    try {
        const weather = await getWeather(name);

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

//  Écouter la recherche envoyée la partie du Mansouri Aicha
document.addEventListener("city:search", (event) => {
    updateWeather(event.detail);
});
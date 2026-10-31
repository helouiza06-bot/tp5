import { displayWeatherDetails }
from "./js/weatherDetails.js";

document.addEventListener("weather:update", (event)=>{
    const weather = event.detail;
    displayWeatherDetails(weather);
});
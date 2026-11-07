export function displayWeatherDetails(weather) {
    //Récupérer les éléments HTML
    const humidity = document.querySelector("#humidity");
    const wind = document.querySelector("#wind");
    const pressure = document.querySelector("#pressure");

    //Afichage
    humidity.textContent = weather.relative_humidity_2m + "%";
    wind.textContent = weather.wind_speed_10m + " km/h";
    pressure.textContent= weather.surface_pressure + " hPa";
}
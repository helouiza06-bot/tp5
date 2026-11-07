
// 1. Récupérer les coordonnées d'une ville
export async function getCoordinates(name) {

    // Chercher d'abord dans notre fichier JSON
    const responseJSON = await fetch("./data/cities.json");
    const cities = await responseJSON.json();

    const city = cities.find(
        c => c.name.toLowerCase() === name.trim().toLowerCase()
    );

    // Si la ville existe dans le JSON
    if (city) {
        return {
            latitude: city.latitude,
            longitude: city.longitude
        };
    }

    // Sinon, utiliser l'API de géolocalisation
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(name)}&count=1&language=fr&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Erreur lors de la recherche de la ville.");
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error("Ville introuvable.");
    }

    return {
        latitude: data.results[0].latitude,
        longitude: data.results[0].longitude
    };
}


// 2. Récupérer les données météorologiques
export async function getWeather(name) {

    const coordinates = await getCoordinates(name);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Erreur lors de la récupération de la météo.");
    }

    const data = await response.json();

    return data.current;
}

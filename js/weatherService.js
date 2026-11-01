
// Récupérer les coordonnées d'une ville à partir de son nom
export async function getCoordinates(cityName) {

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=fr&format=json`;

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


// Récupérer les données météo de la ville
export async function getWeather(cityName) {

    // Étape 1 : récupérer les coordonnées
    const coordinates = await getCoordinates(cityName);

    // Étape 2 : construire l'URL météo
    const params = new URLSearchParams({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        current: "temperature_2m,relative_humidity_2m,wind_speed_10m,surface_pressure",
        wind_speed_unit: "kmh"
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params}`;

    // Étape 3 : envoyer la requête
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Impossible de récupérer les données météo.");
    }

    // Étape 4 : convertir la réponse en objet JavaScript
    const data = await response.json();

    // Étape 5 : retourner les données météo actuelles
    return data.current;
}

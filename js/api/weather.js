

export function getWeather(date) {
    let API_URL = `https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin&start_date=${date}&end_date=${date}`;

    return fetch (API_URL)
    .then (function(response) {
        return response.json();
    })
    .then (function (data) {
        return data;
    })
}


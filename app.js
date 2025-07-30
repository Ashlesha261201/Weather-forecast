const cityInput = document.getElementById("userlocation");
const converter=document.getElementById("converter");
const weathericon = document.getElementById("weather-icon");
const temperature = document.querySelector("#temperature");
const feelslike = document.querySelector("#feelslike");
const description = document.querySelector("#description");
const date = document.querySelector("#date");
const city = document.querySelector("#city");

const Hvalue = document.getElementById("Hvalue");
const Wvalue = document.getElementById("Wvalue");
const SRvalue = document.getElementById("SRvalue");
const SSvalue = document.getElementById("SSvalue");
const Cvalue = document.getElementById("Cvalue");
const UVvalue = document.getElementById("UVvalue");
const Pvalue = document.getElementById("Pvalue");
const forecastContainer = document.getElementById("forecast");

const API_key = "74123ed07f05449e91b60410253007";
let temperatureUnit = 'C';

const weather_API_endppoint= "http://api.weatherapi.com/v1/current.json?key=74123ed07f05449e91b60410253007&q=";
const weather_data_Endpoint = "http://api.weatherapi.com/v1/forecast.json?key=74123ed07f05449e91b60410253007&exclude=minutely&units=metric&q=London&days=1"

function findUserLocation() {
    const location = cityInput.value.trim();

    if (!location) {
        alert("Please enter a city name.");
        return;
    }

    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_key}&q=${location}&days=7&aqi=no&alerts=no`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch weather data");
            return response.json();
        })
        .then(data => {
            city.textContent = `${data.location.name}, ${data.location.country}`;
            temperature.textContent = `${convertTemperature(data.current.temp_c)}°${temperatureUnit}`;
            feelslike.textContent = `Feels like ${convertTemperature(data.current.feelslike_c)}°${temperatureUnit}`;
            description.textContent = data.current.condition.text;

            weathericon.src = "https:" + data.current.condition.icon;

            Hvalue.textContent = data.current.humidity + "%";
            Wvalue.textContent = data.current.wind_kph + " km/h";
            Cvalue.textContent = data.current.cloud + "%";
            UVvalue.textContent = data.current.uv;
            Pvalue.textContent = data.current.pressure_mb + " mb";

            SRvalue.textContent = data.forecast.forecastday[0].astro.sunrise;
            SSvalue.textContent = data.forecast.forecastday[0].astro.sunset;

            const today = new Date();
            date.textContent = today.toDateString();

            displayForecast(data.forecast.forecastday);
        })
        .catch(error => {
            console.error("Error fetching weather:", error);
            alert("Could not find weather for that location.");
        });
}

// Display weekly forecast 
function displayForecast(forecastData) {
    forecastContainer.innerHTML = ''; 

    forecastData.forEach(day => {
        const dateObj = new Date(day.date);
        const icon = day.day.condition.icon;
        const desc = day.day.condition.text;
        const maxTemp = convertTemperature(day.day.maxtemp_c);
        const minTemp = convertTemperature(day.day.mintemp_c);

        const card = document.createElement('div');
        card.className = 'bg-blue-200 rounded-xl p-4 text-center shadow';

        card.innerHTML = `
            <div class="text-md font-semibold mb-2">${dateObj.toDateString().slice(0, 10)}</div>
            <img src="https:${icon}" alt="${desc}" class="mx-auto w-12 h-12">
            <div class="capitalize text-sm mb-1">${desc}</div>
            <div class="text-sm font-bold">${maxTemp}° / ${minTemp}° ${temperatureUnit}</div>
        `;

        forecastContainer.appendChild(card);
    });
}




// Changing Units 


// Convert temp if needed
function convertTemperature(tempC) {
    return temperatureUnit === 'C' ? Math.round(tempC) : Math.round((tempC * 9) / 5 + 32);
}

// Update dropdown listener
document.getElementById('converter').addEventListener('change', function () {
    const selected = this.value;
    temperatureUnit = selected === 'Fahrenheit' ? 'F' : 'C';

    // Re-fetch data for the current city
    const city = document.getElementById('userlocation').value;
    if (city) {
        findUserLocation();
    }
});

// Get weather by geolocation
function getWeatherByGeolocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${API_key}&q=${lat},${lon}&days=7&aqi=no&alerts=no`;

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) throw new Error("Failed to fetch weather data");
                    return response.json();
                })
                .then(data => {
                    city.textContent = `${data.location.name}, ${data.location.country}`;
                    temperature.textContent = `${convertTemperature(data.current.temp_c)}°${temperatureUnit}`;
                    feelslike.textContent = `Feels like ${convertTemperature(data.current.feelslike_c)}°${temperatureUnit}`;
                    description.textContent = data.current.condition.text;

                    weathericon.src = "https:" + data.current.condition.icon;

                    Hvalue.textContent = data.current.humidity + "%";
                    Wvalue.textContent = data.current.wind_kph + " km/h";
                    Cvalue.textContent = data.current.cloud + "%";
                    UVvalue.textContent = data.current.uv;
                    Pvalue.textContent = data.current.pressure_mb + " mb";

                    SRvalue.textContent = data.forecast.forecastday[0].astro.sunrise;
                    SSvalue.textContent = data.forecast.forecastday[0].astro.sunset;

                    const today = new Date();
                    date.textContent = today.toDateString();

                    displayForecast(data.forecast.forecastday);
                })
                .catch(error => {
                    console.error("Error fetching weather:", error);
                    alert("Could not fetch weather for your location.");
                });
        },
        (error) => {
            alert("Geolocation failed: " + error.message);
        }
    );
}

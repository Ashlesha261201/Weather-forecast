const userlocation = document.getElementById("userlocation"),
converter=document.getElementById("converter"),
weathericon = document.getElementById("weather-icon"),
temperature = document.querySelector("#temperature"),
feelslike = document.querySelector("#feelslike"),
description = document.querySelector("#description"),
date = document.querySelector("#date"),
city = document.querySelector("#city"),

Hvalue = document.getElementById("Hvalue"),
Wvalue = document.getElementById("Wvalue"),
SRvalue = document.getElementById("SRvalue"),
SSvalue = document.getElementById("SSvalue"),
Cvalue = document.getElementById("Cvalue"),
UVvalue = document.getElementById("UVvalue"),
Pvalue = document.getElementById("Pvalue"),
forecast = document.getElementById("forecast")

const weather_API_endppoint= "http://api.weatherapi.com/v1/current.json?key=74123ed07f05449e91b60410253007&q=";
weather_data_Endpoint = "http://api.weatherapi.com/v1/current.json?key=74123ed07f05449e91b60410253007&exclude=minutely&units=metric&q=L"

function findUserLocation(){
   fetch(weather_API_endppoint + "London&day=1")
   .then((response) => response.json())
   .then((data) => {
    console.log(data);
    
     
      temperature.textContent = data.current.temp_c + "°C";
      feelslike.textContent = "Feels like " + data.current.feelslike_c + "°C";
      description.textContent = data.current.condition.text;
      weathericon.src = "https:" + data.current.condition.icon;

      Hvalue.textContent = data.current.humidity + "%";
      Wvalue.textContent = data.current.wind_kph + " km/h";
      Cvalue.textContent = data.current.cloud + "%";
      UVvalue.textContent = data.current.uv;
      Pvalue.textContent = data.current.pressure_mb + " mb";

      SRvalue.textContent = data.forecast.forecastday[0].astro.sunrise;
      SSvalue.textContent = data.forecast.forecastday[0].astro.sunset;

      // Set today's date
      const today = new Date();
      date.textContent = today.toDateString();
    })
    .catch(error => {
      console.error("Error fetching weather:", error);
   });
}

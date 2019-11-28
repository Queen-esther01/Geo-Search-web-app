"use strict";

var reportSectionHeading = document.getElementById("weather-report-heading");
var weatherReport = document.querySelector("#weather-report");
var searchButton = document.getElementById("search-button");
var reportSectionContainer = document.getElementById("weather-report-container");
reportSectionContainer.style.display = 'none';

var celsius = document.getElementById("convert-celsius");
var fahrenheit = document.getElementById("convert-fahrenheit");
var mapImage = document.getElementById('map-image');

var getData = function getData() {
    var cityInput = document.getElementById("city").value;
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&APPID=ab5ae10bb222c2259144e71e0e09959d').then(function (response) {
        return response.json();
    }).then(function (data) {
        if (data.message === 'city not found') {
            reportSectionHeading.textContent = "City Not Found!";
            weatherReport.style.display = 'none';
            celsius.style.display = 'none';
            fahrenheit.style.display = 'none';
        } else if (cityInput === "") {
            reportSectionHeading.textContent = "Searchbox is empty!";
            weatherReport.style.display = 'none';
            celsius.style.display = 'none';
            fahrenheit.style.display = 'none';
        } else {
            weatherReport.style.display = 'block';
            reportSectionHeading.textContent = "Weather report on " + cityInput;
            weatherReport.textContent = "Today in " + cityInput + ", " + 'the weather condition is ' + data.weather[0].description + ', ' + 'the wind speed is ' + data.wind.speed + ', ' + 'temperature is ' + data.main.temp + '°K' + ' and humidity is ' + data.main.humidity + '.';
            celsius.style.display = 'inline-block';
            fahrenheit.style.display = 'inline-block';
        }

        reportSectionContainer.style.display = 'block';
        weatherReport.textContent = "Today in " + cityInput + ", " + 'the weather condition is ' + data.weather[0].description + ', ' + 'the wind speed is ' + data.wind.speed + ', ' + 'temperature is ' + data.main.temp + '°K' + ' and humidity is ' + data.main.humidity + '.';
        console.log(data);

        //convert to Fahrenheit
        fahrenheit.addEventListener('click', convertToFahrenheit = function convertToFahrenheit() {
            weatherReport.textContent = "Converted to Fahrenheit, the weather in " + cityInput + " is " + parseInt(data.main.temp - 273.15) * 9 / 5 + '°F';
        });

        //convert to Celsius
        celsius.addEventListener('click', convertToCelsius = function convertToCelsius() {
            weatherReport.textContent = "Converted to Celsius, the weather in " + cityInput + " is " + parseInt(data.main.temp - 273.15) + '°C';
        });

        //Loading map by assigning link
        mapImage.src = 'https://maps.googleapis.com/maps/api/staticmap?center=' + cityInput + '&zoom=12&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C' + data.coord.lat + ',' + data.coord.lon + '&key=AIzaSyBAZKbYaZnUJ5yS9Vy6FjHkjKaCnrN06ug';

        var shareButton = document.getElementById('share-button');
        shareButton.href = "https://maps.googleapis.com/maps/api/staticmap?center=" + cityInput + "&zoom=12&size=600x300&maptype=roadmap&key=AIzaSyBAZKbYaZnUJ5yS9Vy6FjHkjKaCnrN06ug";
    }).catch(function (err) {
        return console.log(err);
    });
};

searchButton.addEventListener('click', getData);
mapImage.src = 'https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyBAZKbYaZnUJ5yS9Vy6FjHkjKaCnrN06ug';

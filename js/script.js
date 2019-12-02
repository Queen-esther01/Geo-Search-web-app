
            const reportSectionHeading = document.getElementById("weather-report-heading");
            const weatherReport = document.querySelector("#weather-report");
            const searchButton = document.getElementById("search-button");
            const reportSectionContainer = document.getElementById("weather-report-container");
            reportSectionContainer.style.display = 'none';

            const kelvin = document.getElementById("convert-kelvin");
            const fahrenheit = document.getElementById("convert-fahrenheit");           
            const mapImage = document.getElementById('map-image');

            const loaderIcon = document.getElementById("loader-icon");
            const getData = () => {
                const cityInput = document.getElementById("city").value;
                loaderIcon.style.display = "block";
                reportSectionContainer.style.display = 'none';
                fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&APPID=ab5ae10bb222c2259144e71e0e09959d')
                .then((response) => response.json())
                .then((data) => {
                    if(data.message === 'city not found'){
                        reportSectionHeading.textContent = "City Not Found!";
                        weatherReport.style.display = 'none';
                        kelvin.style.display = 'none';
                        fahrenheit.style.display = 'none';
                        loaderIcon.style.display = "none";
                     }
                     else if(cityInput === ""){
                        reportSectionHeading.textContent = "Searchbox is empty!";
                        weatherReport.style.display = 'none';
                        kelvin.style.display = 'none';
                        fahrenheit.style.display = 'none';
                        loaderIcon.style.display = "none";
                    }
                     else{
                        weatherReport.style.display = 'block';
                        reportSectionHeading.textContent = `Weather report on ${cityInput}`;
                        weatherReport.textContent = `Today in ${cityInput}, ` + 'the weather condition is ' + data.weather[0].description +', ' + 'the wind speed is ' + data.wind.speed + ', ' + 'temperature is ' + data.main.temp + '°K' + ' and humidity is ' + data.main.humidity + '.'
                        kelvin.style.display = 'inline-block';
                        fahrenheit.style.display = 'inline-block';
                     }


                    reportSectionContainer.style.display = 'block';
                    weatherReport.textContent = `Today in ${cityInput}, ` + 'the weather condition is ' + data.weather[0].description + ', ' + 'the wind speed is ' + data.wind.speed + ', ' + 'temperature is ' + parseInt(data.main.temp - 273.15) + '°C' + ' and humidity is ' + data.main.humidity + '.'
                    loaderIcon.style.display = "none";
                    console.log(data)

                     //convert to Fahrenheit
                    fahrenheit.addEventListener('click', convertToFahrenheit = () => {
                        weatherReport.textContent = `Converted to Fahrenheit, the weather in ${cityInput} is ` + parseInt(data.main.temp - 273.15) * 9/5 + '°F';
                    })

                    //convert to Kelvin
                    kelvin.addEventListener('click', convertToKelvin = () => {
                        weatherReport.textContent = `Converted to Kelvin, the weather in ${cityInput} is ` + parseInt(data.main.temp + 273.15) + '°K';
                    })


                    //Loading map by assigning link
                    mapImage.src = ('https://maps.googleapis.com/maps/api/staticmap?center=' + cityInput + '&zoom=12&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C' + data.coord.lat + ',' + data.coord.lon + '&key=AIzaSyBAZKbYaZnUJ5yS9Vy6FjHkjKaCnrN06ug');
            
            })
            
            .catch((err) => console.log(err.message))

            
            }

            searchButton.addEventListener('click', getData);
            mapImage.src = ('https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyBAZKbYaZnUJ5yS9Vy6FjHkjKaCnrN06ug')
    
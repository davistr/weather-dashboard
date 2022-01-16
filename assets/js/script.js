var today = new Date();

var cityFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var citySearchEl = document.querySelector("#search-history");
var weatherInputEl = document.querySelector("#weather-container");
var forecastInputEl = document.querySelector("#forecast-container");
var counter = 6;
var key = 0;

// use city name for API call
var getCities = function (cityName) {
    var apiKey = "72f0e6a86d77bd4ccda5c2b150f20525";

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey).then(function (response) {
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
            // console.log(data.name);
            // console.log(today);
            displayWeather(data);
        });
    });

    fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey).then(function (response) {
        console.log(response);
        response.json().then(function (data) {
            console.log(data);
            // // console.log(data.name);
            // // console.log(today);
            displayForecast(data);
        });
    });
};

var displayWeather = function (data) {

    var fahrenheit = Math.round(((parseFloat(data.main.temp) - 273.15) * 1.8) + 32);
    var iconCode = data.weather[0].icon;

    document.getElementById('weather-container').innerHTML = "<span style='font-size:32px; font-weight:bolder'>" + data.name + "  " + today.toLocaleDateString("en-US") + "</span>" + " " + "<img src=\"http://openweathermap.org/img/wn/" + iconCode + "@2x.png\">" + "<br />" + "Temp: " + fahrenheit
        + "&deg" + "F" + "<br />" + "Wind: " + data.wind.speed + " MPH" + "<br />" + "Humidity: " + data.main.humidity + "%" + "<br />";

    weatherInputEl.setAttribute('style', 'margin-bottom:20px; border: 3px solid darkcyan; padding: 12px;');
};

var displayForecast = function (data) {

    for (var i = 0; i < 5; i++) {

        var iconCode = data.list[counter].weather[0].icon;

        var forecastEl = document.createElement('div');
        forecastEl.className = 'forecast';
        // forecastDate.toLocaleDateString("en-US");

        forecastEl.innerHTML = data.list[counter].dt_txt + "<br />" + "<img src=\"http://openweathermap.org/img/wn/" + iconCode + "@2x.png\">" + "<br /v>" + "Temp: " + Math.round(((parseFloat(data.list[counter].main.temp) - 273.15) * 1.8) + 32) +
            "&deg" + "F" + "<br />" + "Wind: " + data.list[counter].wind.speed + " MPH" +
            "<br />" + "Humidity: " + data.list[counter].main.humidity + " %";

        forecastInputEl.appendChild(forecastEl);
        counter += 8;
    }

};

// save cities to localstorage
var saveStorage = function (key, cityName) {
    localStorage.setItem(key, cityName);
};

// load localstorage to page
var loadStorage = function () {

    for (var i = 0; i < localStorage.length; i++) {
        var searchEl = document.createElement('button');
        searchEl.className = 'search-item';

        var city = localStorage.getItem(i);
        searchEl.innerHTML = city;
    }
    citySearchEl.append(searchEl);
};


var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getCities(cityName);
        cityInputEl.value = "";
        saveStorage(key, cityName);
        loadStorage();
    }
    else {
        alert("Please enter a city name!");
    }

    key++;
};

// event listener for 
cityFormEl.addEventListener("submit", formSubmitHandler);
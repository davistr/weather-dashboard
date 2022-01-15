var today = new Date();

var cityFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var weatherInputEl = document.querySelector("#weather-container");
var forecastInputEl = document.querySelector("#forecast-container");
var counter = 6;
var key = 0;


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
    // data.name.classList.add = ("city");

    var iconCode = data.weather[0].icon;


    document.getElementById('weather-container').innerHTML = data.name + " " + today.toLocaleDateString("en-US") + "  " + "<img src=\"http://openweathermap.org/img/wn/" + iconCode + "@2x.png\">" + "<br />" + "Temp: " + fahrenheit
        + "&deg" + "F" + "<br />" + "Wind: " + data.wind.speed + " MPH" + "<br />" + "Humidity: " + data.main.humidity + "%" + "<br />" + "UV Index:  " + data.uvi;

    weatherInputEl.setAttribute('style', 'margin-bottom:20px; border: 3px solid darkcyan;');
};

var displayForecast = function (data) {

    for (var i = 0; i < 5; i++) {

        var iconCode = data.list[counter].weather[0].icon;

        var forecastEl = document.createElement('div');
        forecastEl.className = 'forecast';

        forecastEl.innerHTML = data.list[counter].dt_txt + "<br />" + "<img src=\"http://openweathermap.org/img/wn/" + iconCode + "@2x.png\">" + "<br /v>" + "Temp: " + Math.round(((parseFloat(data.list[counter].main.temp) - 273.15) * 1.8) + 32) +
            "&deg" + "F" + "<br />" + "Wind: " + data.list[counter].wind.speed + " MPH" +
            "<br />" + "Humidity: " + data.list[counter].main.humidity + " %";

        forecastInputEl.appendChild(forecastEl);
        counter += 8;
    }
};


var saveStorage = function (key, cityName) {
    localStorage.setItem(key, cityName);
}


var loadStorage = function () {

    // for (var i = 0; i < localStorage.length; i++) {
    //     localStorage[i].
    // }
}


var formSubmitHandler = function (event) {
    event.preventDefault();

    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getCities(cityName);
        cityInputEl.value = "";
    }
    else {
        alert("Please enter a city name!");
    }

    saveStorage(key, cityName);
    key++;
};


cityFormEl.addEventListener("submit", formSubmitHandler);
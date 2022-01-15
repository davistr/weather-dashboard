var today = new Date();

var cityFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var weatherInputEl = document.querySelector("#weather-container");
var forecastInputEl = document.querySelector("#forecast-container");


var getCities = function (cityName) {
    var apiKey = "72f0e6a86d77bd4ccda5c2b150f20525";
    // var apiURL = ;

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey).then(function (response) {
        console.log(response);
        response.json().then(function (data) {
            // console.log(data);
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

    // weatherInputEl.appendChild();

    document.getElementById('weather-container').innerHTML = data.name + "<br />" + "Temp: " + fahrenheit
        + "&deg" + "F" + "<br />" + "Wind: " + data.wind.speed + " MPH" + "<br />" + data.weather.icon;
};

var displayForecast = function (data) {

    // var fahrenheit = Math.round(((parseFloat(data.list[i].main.temp) - 273.15) * 1.8) + 32);

    for (var i = 0; i < 5; i++) {

        var iconCode = data.list[i].weather.icon;
        var iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

        // document.getElementById('forecast-' + i).innerHTML = "Temp: " + data.list[i].main.temp + "&deg" + "F" + "<br />" + "Wind: " + data.list[i].wind.speed +
        //     "<br />";
        // $("wicon-0").attr('src', "http://openweathermap.org/img/wn/" + iconCode + "@2x.png");


        var forecastEl = document.createElement('div');
        forecastEl.className = 'forecast';

        forecastEl.innerHTML = "Temp: " + data.list[i].main.temp + "&deg" + "F" + "<br />" + "Wind: " + data.list[i].wind.speed +
            "<br />";

        forecastInputEl.appendChild(forecastEl);

    }

};

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

    console.log(event);
};


cityFormEl.addEventListener("submit", formSubmitHandler);
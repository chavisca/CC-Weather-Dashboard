var citySearchEl = $('#citySearchText');
var currentCityEl = $('#currentCity');
var buttons = [];
var para = document.createElement('p');


$(document).ready(function() {

// Build form with search function
// Previously searched cities should list (new row) and be clickable
// For this reason searches need to save to localStorage
// use Geocoding API for city level names http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// create click event for form submit

// Populates today's date and dates of 5 day forecast, commented out because api pull gets dates
// function displayDate() {
//     const today = dayjs();
//     $('#currentDay').text(today.format('M/DD/YYYY'));
//     var day1 = today.add(1, 'day').format('M/DD/YYYY');
//     $('#nextDay1').text(day1);
//     var day2 = today.add(2, 'day').format('M/DD/YYYY');
//     $('#nextDay2').text(day2);
//     var day3 = today.add(3, 'day').format('M/DD/YYYY');
//     $('#nextDay3').text(day3);
//     var day4 = today.add(4, 'day').format('M/DD/YYYY');
//     $('#nextDay4').text(day4);
//     var day5 = today.add(5, 'day').format('M/DD/YYYY');
//     $('#nextDay5').text(day5);
// }

var searchSubmit = function (event) {
    event.preventDefault();

    var cityInput = citySearchEl.val();
    currentCityEl.text(cityInput);
    // Add dynamic button creation with each search with btn functionality to be searched
    var cityButton = document.createElement('button');
    cityButton.textContent = cityInput;

    //Reloads input text
    cityButton.addEventListener('click', function() {
        document.getElementById('citySearchText').value = cityInput;
    });

    //Saves buttons to array
    buttons.push(cityInput);
    saveButtonsToLocalStorage();

    document.getElementById('history').appendChild(cityButton);
    document.getElementById('history').appendChild(para);
    
    getApi(cityInput);
};

function loadButtonsFromLocalStorage() {
    var savedButtons = localStorage.getItem('buttons');

    if (savedButtons) {
        buttons = JSON.parse(savedButtons);
        buttons.forEach(function(buttonText) {
            var button = document.createElement('button');
            button.textContent = buttonText;
            button.addEventListener('click', function() {
                document.getElementById('cityInput').value = buttonText;
            });
            var para = document.createElement('p');
            para.appendChild(button);
            document.getElementById('history').appendChild(para);
        });
    }
};

function saveButtonsToLocalStorage (){
    localStorage.setItem('buttons', JSON.stringify(buttons));
};

function getApi() {
    var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=38a14f455e291460489082db93502bea';

    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        var lat = data.lat;
        var lon = data.lon;
      });

    var getWeatherURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=38a14f455e291460489082db93502bea';

    fetch(getWeatherURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        document.getElementById("currentCity").textContent = data[0].list.city.name;
        document.getElementById("currentDay").textContent = new Date(data[0].list.dt * 1000).toLocaleDateString();
        var currentTempKelvin = data.list[0].main.temp;
        var currentTempFahrenheit = (currentTempKelvin - 273.15) * 9/5 + 32;
        document.getElementById("maincard-text").textContent = "Temp: " + data[0].list.main.temp + "°C";
        document.getElementById("maincard-text").textContent = "Wind: " + data[0].list.wind.speed + " m/s";
        document.getElementById("maincard-text").textContent = "Humidity: " + data[0].list.main.humidity + "%";
        
        for (var i = 0; i < 5; i++) {
            var forecastIndex = i + 1;
            document.getElementById("nextDay" + forecastIndex).textContent = new Date(data[i].list.dt * 1000).toLocaleDateString();
            document.getElementById("icon" + forecastIndex).setAttribute("src", "http://openweathermap.org/img/w/" + data[i].list.weather.icon + ".png");
            var forecastTempKelvin = data[i].list.main.temp;
            var forecastTempFahrenheit = (forecastTempKelvin - 273.15) * 9/5 + 32;
            document.getElementById("temp" + forecastIndex).textContent = "Temp: " + data[i].list.main.temp + "°C";
            document.getElementById("wind" + forecastIndex).textContent = "Wind: " + data[i].list.wind.speed + " m/s";
            document.getElementById("humid" + forecastIndex).textContent = "Humidity: " + data[i].list.main.humidity + "%";

        }
      });
};

document.getElementById('searchButton').addEventListener('click', searchSubmit);

// displayDate();
loadButtonsFromLocalStorage();
});
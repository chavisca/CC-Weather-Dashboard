var citySearchEl = $('#citySearchText');
var currentCityEl = $('#currentCity');
var buttons = [];
var para = document.createElement('p');


$(document).ready(function() {

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
            button.classList.add('history-button');
            button.addEventListener('click', function() {
                var buttonText = this.textContent;
                getApi(buttonText);
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

function getApi(cityInput) {
    var requestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&limit=1&appid=38a14f455e291460489082db93502bea`;

    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        var lat = data[0].lat;
        var lon = data[0].lon;

    var getWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=38a14f455e291460489082db93502bea`;

    return fetch(getWeatherURL);
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        document.getElementById("currentCity").textContent = data.city.name;
        document.getElementById("currentDay").textContent = new Date(data.list[0].dt * 1000).toLocaleDateString();
        document.getElementById("mainIcon").setAttribute("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png");
        var currentTempKelvin = data.list[0].main.temp;
        var currentTempFahrenheit = ((currentTempKelvin - 273.15) * 9 / 5 + 32).toFixed(2);
        document.getElementById("maincard-temp").textContent = "Temp: " + currentTempFahrenheit + "°F";
        var currentWindMS = data.list[0].wind.speed;
        var currentWindMPH = ((currentWindMS) * 2.23694).toFixed(2);
        document.getElementById("maincard-wind").textContent = "Wind: " + currentWindMPH + " MPH";
        document.getElementById("maincard-humid").textContent = "Humidity: " + data.list[0].main.humidity + "%";

for (var i = 1; i <= 5; i++) {
    var forecastIndex = i;
    var dataIndex = i * 8;

    if(data.list[dataIndex]) {
      document.getElementById("nextDay" + forecastIndex).textContent = new Date(data.list[dataIndex].dt * 1000).toLocaleDateString();
      document.getElementById("icon" + forecastIndex).setAttribute("src", "http://openweathermap.org/img/w/" + data.list[dataIndex].weather[0].icon + ".png");
      var forecastTempKelvin = data.list[dataIndex].main.temp;
      var forecastTempFahrenheit = ((forecastTempKelvin - 273.15) * 9 / 5 + 32).toFixed(2);
      document.getElementById("temp" + forecastIndex).textContent = "Temp: " + forecastTempFahrenheit + "°F";
      var forecastWindMS = data.list[dataIndex].wind.speed;
      var forecastWindMPH = ((forecastWindMS) * 2.23694).toFixed(2);
      document.getElementById("wind" + forecastIndex).textContent = "Wind: " + forecastWindMPH + " MPH";
      document.getElementById("humid" + forecastIndex).textContent = "Humidity: " + data.list[dataIndex].main.humidity + "%";
    
    } else {
    
      document.getElementById("nextDay" + forecastIndex).textContent = "Data Not Available";
        document.getElementById("icon" + forecastIndex).setAttribute("src", "");
        document.getElementById("temp" + forecastIndex).textContent = "Temp: N/A";
        document.getElementById("wind" + forecastIndex).textContent = "Wind: N/A";
        document.getElementById("humid" + forecastIndex).textContent = "Humidity: N/A";

    }
        }
      });
};

document.querySelector('form').addEventListener('submit', searchSubmit);

// displayDate();
loadButtonsFromLocalStorage();
});
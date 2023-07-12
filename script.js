var citySearchEl = $('#citySearchText');
var currentCityEl = $('#currentCity');
var responseMain = document.getElementById('') //add IDs for each response area on HTML and iterate
var buttons = [];
$(document).ready(function() {

// fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}')
//   .then(function (response) {
//     return response.json();
//   })
//   .then (function (data) {
//     console.log(data);
//   });
// API Key:  38a14f455e291460489082db93502bea

// Build form with search function
// Previously searched cities should list (new row) and be clickable
// For this reason searches need to save to localStorage
// use Geocoding API for city level names http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// create click event for form submit

// Populates today's date and dates of 5 day forecast
function displayDate() {
    var today = dayjs();
    $('#currentDay').text(today.format('M/DD/YYYY'));
    var day1 = dayjs().add(1, 'day').format('M/DD/YYYY');
    $('#nextDay1').text(day1);
    var day2 = dayjs().add(2, 'day').format('M/DD/YYYY');
    ('#nextDay2').text(day2);
    var day3 = dayjs().add(3, 'day').format('M/DD/YYYY');
    $('#nextDay3').text(day3);
    var day4 = dayjs().add(4, 'day').format('M/DD/YYYY');
    $('#nextDay4').text(day4);
    var day5 = dayjs().add(5, 'day').format('M/DD/YYYY');
    $('#nextDay5').text(day5);
}

var handleFormSubmit = function (event) {
    event.preventDefault();

    var cityInput = citySearchEl.val();
    cityInput.text = currentCityEl;
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

    document.getElementById('buttonContainer').appendChild(button);
    
}

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
            document.getElementById('buttonContainer').appendChild(button);
        });
    }
}

function saveButtonsToLocalStorage (){
    localStorage.setItem('buttons', JSON.stringify(buttons));
}

document.getElementById('createButton').addEventListener('click', createButton);

displayDate();
loadButtonsFromLocalStorage();
});
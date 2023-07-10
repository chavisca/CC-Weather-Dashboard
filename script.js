var currentDayEl = $('#currentDay');
var nextDayEl1 = $('#nextDay1');
var nextDayEl2 = $('#nextDay2');
var nextDayEl3 = $('#nextDay3');
var nextDayEl4 = $('#nextDay4');
var nextDayEl5 = $('#nextDay5');
var responseMain = document.getElementById('') //add IDs for each response area on HTML and iterate

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
// use dayJS to pull current date and 5 day forecast dates
// create click event for form submit

function displayDate() {
    var today = dayjs().format('M/DD/YYYY');
    currentDayEl.text(today);
    var day1 = dayjs().add(1, 'day').format('M/DD/YYYY');
    nextDayEl1.text(day1);
    var day2 = dayjs().add(2, 'day').format('M/DD/YYYY');
    nextDayEl2.text(day2);
    var day3 = dayjs().add(3, 'day').format('M/DD/YYYY');
    nextDayEl3.text(day3);
    var day4 = dayjs().add(4, 'day').format('M/DD/YYYY');
    nextDayEl4.text(day4);
    var day5 = dayjs().add(5, 'day').format('M/DD/YYYY');
    nextDayEl5.text(day5);
}

displayDate();
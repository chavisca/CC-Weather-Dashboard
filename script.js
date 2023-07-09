var responseMain = document.getElementById('') //add IDs for each response area on HTML and iterate

fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}')
  .then(function (response) {
    return response.json();
  })
  .then (function (data) {
    console.log(data);
  });
// API Key:  38a14f455e291460489082db93502bea

// Build form with search function
// Previously searched cities should list (new row) and be clickable
// For this reason searches need to save to localStorage
// use Geocoding API for city level names http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// use dayJS to pull current date and 5 day forecast dates

var searchFormEl = document.querySelector("#search-form");
var searchCityEl = document.querySelector("#searchCity");

var formSubmitHandler = function(event) {
    event.preventDefault();

    //get value from input element
    var cityInput = searchCityEl.value.trim();

    if(cityInput){
        getCityInput(cityInput);
        searchCityEl.value = "";
    } else {
        alert("Please enter a City name")
    }

    console.log(event);
}

var getCityInput = function(city){
    var apiUrl='https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=669456fc6ce6179395a5c719d69a9512';
    // make a request to the url
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data);
    });
  });
};

searchFormEl.addEventListener("submit", formSubmitHandler);

  var findHistory = JSON.parse(window.localStorage.getItem("searchhistory")) || [];
 
  for (var i=0; i<findHistory.length; i++) {
    createListItem(findHistory[i]);
  }
 
  $(".find-history").on("click", "li", function() {findWeather($(this).text())})
 
    function createListItem (city) {
    var liItem = $("<li>").text(city);
    $(".find-history").append(liItem);
  }
 
  function findForecast(searchInput) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=8a0b187f58134a2e51bff5ae31b7377e&units=imperial",
        method: "GET"
    }).then(function (data) {
   
    $("#forecast").empty();
 
    for (var i=0; i<data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("09:00:00") !== -1) {
          console.log(dayjs(data.list[i].dt_txt).format("DD/MM/YYYY"))
         
            var container= $("<div>")
            var city = $("<h5>").text(data.city.name + " | " + dayjs(data.list[i].dt_txt).format("DD/MM/YYYY"));
            var temp = $("<p>").text(data.list[i].main.temp + "\u00B0F");
            var humidity = $("<p>").text(data.list[i].main.humidity + "%");
            container.append(city, temp, humidity);
            container.addClass("mini-card")
 
            $("#forecast").append(container);
         }
        }
    })
  }
 
  function findUv(latitude, longitude) {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + latitude + '&lon=' + longitude + '&exclude=hourly,daily&appid=8a0b187f58134a2e51bff5ae31b7377e&units=imperial',
        method: "GET"}).then(function (uvResponse) {
 
            var Status = $("<div>").addClass("btn btn-md").text(uvResponse.current.uvi)
            var Card = $("<h5>").text("UV Index: ");
 
        if (uvResponse.current.uvi <= 3) {
            Status.addClass("safe");
        } else if (uvResponse.current.uvi < 7 && uvResponse.current.uvi > 3) {
            Status.addClass("questionable");
        } else {
            Status.addClass("dangerous");
        }
 
        $("#today-weather").append(Status.append(Card));
    });
  }  
 
  function findWeather(searchInput) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=8a0b187f58134a2e51bff5ae31b7377e&units=imperial",
        method: "GET"
    }).then(function (apiResponse) {
 
    $("#today-weather").empty();
   
    if (findHistory) {
        findHistory.push(searchInput);
        window.localStorage.setItem("searchhistory", JSON.stringify(findHistory));
        createListItem(searchInput);  
    }
 
    var city = $("<h4>").text(apiResponse.name + " (" + new Date().toLocaleDateString() + ")");
    var humidity = $("<div>").addClass("today-weather-stats").text("Humidity: " + apiResponse.main.humidity + "%");
    var temperature = $("<div>").addClass("today-weather-stats").text("Temp: " + apiResponse.main.temp + "\u00B0F");
   
    $("#today-weather").append(city, temperature, humidity)
    findForecast (searchInput);
    findUv(apiResponse.coord.lat, apiResponse.coord.lon)
    })
  }
 
  //Runs the search Weather Function upon Button Click
  $("#search-button").on("click", function(event) {
    event.preventDefault();
    var searchInput = $("#form1").val();  
    console.log(searchInput);
    findWeather(searchInput);
  });





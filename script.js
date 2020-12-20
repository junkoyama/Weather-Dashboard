$(document).ready(function () {

  //hide the forecase div on page load
  $("#forecast").hide();

  var APIKey = "6d2b6b9cf67e7c416ba9a947cbfcd77e";
  var queryURL;
  var weatherIconUrl;
  var $todayDiv = $("#today");
  var $tempDiv = $('<div>');
  var $humidityDiv = $('<div>');
  var $windDiv = $('<div>');
  var $uvDiv = $('<div>');
  // var UV_index;

  //Set variable for today's date from moment.js
  var todayDate = moment(new Date()).format("MM/DD/YYYY");
  var getTomorrowDate = moment().add(1, 'days').format("MM/DD/YYYY");
  var getDay2ForecastDate = moment().add(2, 'days').format("MM/DD/YYYY");
  var getDay3ForecastDate = moment().add(3, 'days').format("MM/DD/YYYY");
  var getDay4ForecastDate = moment().add(4, 'days').format("MM/DD/YYYY");
  var getDay5ForecastDate = moment().add(5, 'days').format("MM/DD/YYYY");
  console.log(getTomorrowDate, getDay2ForecastDate,  getDay3ForecastDate, getDay4ForecastDate, getDay5ForecastDate);
  

  //Run current weather conditions
  function getCurrentCondition(url, data) {
    var getCityName = data.name;
    var weatherIcon = data.weather[0].icon;
    var getLatitude = data.coord.lat;
    var getLongitude = data.coord.lon;
    var getWindSpeed = data.wind.speed;
    var getHumidity = data.main.humidity;
    var tempF = (data.main.temp - 273.15) * 1.8 + 32;
    console.log(getLongitude + ", " + getLatitude);

    // Adds weather icon next to city name weather details
    weatherIconUrl = "http://openweathermap.org/img/wn/" +
    weatherIcon +
    ".png";

    UV_index = "http://api.openweathermap.org/data/2.5/uvi?lat="
    + getLatitude +
    "&lon=" +
    getLongitude +
    "&appid=" +
    APIKey;
    
    // Adds text to the HTMl div class tags
    $todayDiv.html(`<h1> ${getCityName} Weather Details for ${todayDate} <img class="weather-icon" src="icons/unknown.png"/> </h1>`);
    $tempDiv.text(`Temperature (F) ${tempF.toFixed(2)}`);
    $humidityDiv.text(`Humidity: ${getHumidity}%`);
    $windDiv.text(`Wind Speed: ${getWindSpeed}MPH`);
    $uvDiv.text("UV Index: Still working on this div");

    $todayDiv.append($tempDiv);
    $tempDiv.append($humidityDiv);
    $humidityDiv.append($windDiv);
    $windDiv.append($uvDiv);
    
    $(".weather-icon").attr('src', weatherIconUrl);
    // $(".UVindex").text(`UV Index: ${UV_index}`);

  }; // end of current conditions

  //Run 5 day forecast condition
  // function getForecastCondition(url, data) {
  //   $("#forecast").text("<h1> 5-Day-Forecast: </h1>");
  //   var forecastDiv = $("<div>"); // create new div in parent forecast div
  //   forecastDiv.attr("class", "card");

  //   var forecastTitle = $("<p>").text()
  // }; // end of forecast

  // Add event listener for search button click. Keep in document ready function to run
  $("#search-button").on("click", function () {
    //displays the forecast div when search is clicked
    $("#forecast").show();

    // set variable for value of search input
    var inputField = $("#search-value").val();
    // set variable for the search input weather condition URL
    queryURL =
      "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" +
      inputField +
      "&appid=" +
      APIKey;

    // Append the search history input value below the box
    $(".search-history").append(`<p> ${inputField} </p>`);

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET",
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function (response) {
        getCurrentCondition(queryURL, response);
        console.log(response);
      });
  }); // end of search button listener

});
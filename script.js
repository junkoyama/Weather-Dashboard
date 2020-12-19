$(document).ready(function () {
  $(".card").hide();
  var APIKey = "6d2b6b9cf67e7c416ba9a947cbfcd77e";
  var queryURL;
  var weatherIconUrl;
  // var UV_index;

  //Set variable for today's date from moment.js
  var todayDate = moment(new Date()).format("MM/DD/YYYY");

  function getCurrentCondition(url, data) {
    var getCityName = data.name;
    var weatherIcon = data.weather[0].icon;
    var getLatitude = data.coord.lat;
    var getLongitude = data.coord.lon;
    var getWindSpeed = data.wind.speed;
    var getHumidity = data.main.humidity;
    console.log(getLongitude + ", " + getLatitude);

    // Adds weather icon next to city name weather details
    weatherIconUrl = "http://openweathermap.org/img/wn/" +
    weatherIcon +
    ".png";

    // UV_index = "http://api.openweathermap.org/data/2.5/uvi?lat="
    // + getLatitude +
    // "&lon=" +
    // getLongitude +
    // "&appid=" +
    // APIKey;
    
    // Adds text to the HTMl div class tags
    $("#today").html(`<h1> ${getCityName} Weather Details for ${todayDate} <img class="weather-icon" src="icons/unknown.png"/> </h1>`);
    $(".wind").text(`Wind Speed: ${getWindSpeed}`);
    $(".humidity").text(`Humidity: ${getHumidity}`);
    $(".weather-icon").attr('src', weatherIconUrl);
    // $(".UVindex").text(`UV Index: ${UV_index}`);

    // Below converts the temp to fahrenheit
    var tempF = (data.main.temp - 273.15) * 1.8 + 32;
    $(".tempF").text(`Temperature (F) ${tempF.toFixed(2)}`);
  }
  // Add event listener for search button click
  $("#search-button").on("click", function () {
    var inputField = $("#search-value").val();
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
      });
  });
});

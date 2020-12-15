$(document).ready(function() {
  var APIKey = "6d2b6b9cf67e7c416ba9a947cbfcd77e";
  var queryURL;
  
  function getCurrentCondition(url, data) {
      console.log(url);
      console.log(data);
  
      // Transfer content to HTML
      $(".city").html("<h1>" + data.name + " Weather Details</h1>");
      $(".wind").text("Wind Speed: " + data.wind.speed);
      $(".humidity").text("Humidity: " + data.main.humidity);
  
      // Convert the temp to fahrenheit
      var tempF = (data.main.temp - 273.15) * 1.8 + 32;
  
      // add temp content to html
      $(".temp").text("Temperature (K) " + data.main.temp);
      $(".tempF").text("Temperature (F) " + tempF.toFixed(2));
  
      // Log the data in the console as well
      console.log("Wind Speed: " + data.wind.speed);
      console.log("Humidity: " + data.main.humidity);
      console.log("Temperature (F): " + tempF);
  };
  
  $("#search-button").on("click", function () {
    var inputField = $("#search-value").val();
    queryURL =
      "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" +
      inputField +
      "&appid=" +
      APIKey;
    console.log(inputField);

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
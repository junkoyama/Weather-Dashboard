$(document).ready(function () {

  // start of current condition function
  function getCurrentCondition() {
    var APIKey = "a168b7b3a607079be418902834224f6b";
    var inputCityName = $("#search-value").val();
    var queryURL;

    queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      inputCityName +
      "&units=imperial&appid=" +
      APIKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // console.log(response);
      var getResponseCityName = response.name; 
      var getResponseTempF = response.main.temp;
      var getResponseHumidity = response.main.humidity; 
      var getResponseWindSpeed = response.wind.speed;
      var weatherIcon = response.weather[0].icon; 
      var todayDate = moment(new Date()).format("MM/DD/YYYY");
      var weatherIconUrl;
      var getLatitude = response.coord.lat;
      var getLongitude = response.coord.lon;

      weatherIconUrl =
        "http://openweathermap.org/img/wn/" + weatherIcon + ".png";

      $("#today").empty();
      $("#today")
      .append(
        `<div>
          <h1> ${getResponseCityName}'s Weather for ${todayDate} <img class="weather-icon" src="${weatherIconUrl}"/> </h2>
          <p> Temperature: ${getResponseTempF}&deg;F </p>
          <p> Humidity: ${getResponseHumidity}% </p>
          <p> Wind Speed: ${getResponseWindSpeed} mph </p>
        </div>
        `);

      getUvIndex(getLatitude, getLongitude);
    });
  } // end of current condition function

  // start of retrieving UV index
  function getUvIndex(latitude, Longitude) {
    var APIKey = "a168b7b3a607079be418902834224f6b";
    var uvIndexUrl =
      "http://api.openweathermap.org/data/2.5/uvi?appid=" +
      APIKey +
      "&lat=" +
      latitude +
      "&lon=" +
      Longitude;

    $.ajax({
      type: "GET",
      url: uvIndexUrl,
    }).then(function (response) {

      var uvIndexVal = response.value;
      $("#today").append(`<p class="show-uv"> UV Index: </p>`);
      $(".show-uv").append(
        $(`<span class="spanClass btn btn-sm"> ${uvIndexVal} </span>`)
      );
      var spanClass = $(".spanClass");

      if (uvIndexVal < 3) {
        spanClass.addClass("btn-success");
      } else if (uvIndexVal < 7) {
        spanClass.addClass("btn-warning");
      } else {
        spanClass.addClass("btn-danger");
      }
    });
  } // end of retrieving UV index

  //start of future forecast cards
  function getFutureForecast() {
    var APIKey = "a168b7b3a607079be418902834224f6b";
    var inputCityName = $("#search-value").val();
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" +
      inputCityName +
      "&units=imperial&appid=" +
      APIKey;

    $.ajax({
      url: forecastUrl,
      method: "GET"
    }).then(function (response) {

      var dayOneDate = moment(response.list[3].dt_txt).format("MM/DD/YYYY");
      var dayOneTemp = response.list[3].main.temp;
      var dayOneHumidity = response.list[3].main.humidity;
      var dayOneforecastIcon = response.list[3].weather[0].icon;
      var dayOneforecastConditionImgSource = "http://openweathermap.org/img/wn/" + dayOneforecastIcon + ".png";

      var dayOneforecastCardDiv = $("<div class='row'>");

      dayOneforecastCardDiv.html(`
      <div class="card-body text-white bg-primary mb-3" style="max-width: 18rem;">
        <h5 class="card-title">${dayOneDate}</h5>
        <img src=" ${dayOneforecastConditionImgSource}" alt="forecastConditionIcon"> <img>
        <div class="card-text">
          Temp: ${dayOneTemp}&deg;F
        </div>
        <div class="card-text">
        Humidity: ${dayOneHumidity}%
        </div>
      </div>
      `);

      var dayTwoforecastCardDiv = $("<div>");
      var dayTwoDate = moment(response.list[11].dt_txt).format("MM/DD/YYYY");
      var dayTwoTemp = response.list[11].main.temp;
      var dayTwoHumidity = response.list[11].main.humidity;
      var dayTwoforecastIcon = response.list[11].weather[0].icon;
      var dayTwoforecastConditionImgSource = "http://openweathermap.org/img/wn/" + dayTwoforecastIcon + ".png";

      dayTwoforecastCardDiv.html(`
      <div class="card-body text-white bg-primary mb-3" style="max-width: 18rem;">
        <h5 class="card-title">${dayTwoDate}</h5>
        <img src=" ${dayTwoforecastConditionImgSource}" alt="forecastConditionIcon"> <img>
        <div class="card-text">
          Temp: ${dayTwoTemp}&deg;F
        </div>
        <div class="card-text">
        Humidity: ${dayTwoHumidity}%
        </div>
      </div>
      `);

      var dayThreeforecastCardDiv = $("<div>");
      var dayThreeDate = moment(response.list[19].dt_txt).format("MM/DD/YYYY");
      var dayThreeTemp = response.list[19].main.temp;
      var dayThreeHumidity = response.list[19].main.humidity;
      var dayThreeForecastIcon = response.list[19].weather[0].icon;
      var dayThreeForecastConditionImgSource = "http://openweathermap.org/img/wn/" + dayThreeForecastIcon + ".png";

      dayThreeforecastCardDiv.html(`
      <div class="card-body text-white bg-primary mb-3" style="max-width: 18rem;">
        <h5 class="card-title">${dayThreeDate}</h5>
        <img src=" ${dayThreeForecastConditionImgSource}" alt="forecastConditionIcon"> <img>
        <div class="card-text">
          Temp: ${dayThreeTemp}&deg;F
        </div>
        <div class="card-text">
        Humidity: ${dayThreeHumidity}%
        </div>
      </div>
      `);

      var dayFourForecastCardDiv = $("<div>");
      var dayFourDate = moment(response.list[27].dt_txt).format("MM/DD/YYYY");
      var dayFourTemp = response.list[27].main.temp;
      var dayFourHumidity = response.list[27].main.humidity;
      var dayFourForecastIcon = response.list[27].weather[0].icon;
      var dayFourForecastConditionImgSource = "http://openweathermap.org/img/wn/" + dayFourForecastIcon + ".png";

      dayFourForecastCardDiv.html(`
      <div class="card-body text-white bg-primary mb-3" style="max-width: 18rem;">
        <h5 class="card-title">${dayFourDate}</h5>
        <img src=" ${dayFourForecastConditionImgSource}" alt="forecastConditionIcon"> <img>
        <div class="card-text">
          Temp: ${dayFourTemp}&deg;F
        </div>
        <div class="card-text">
        Humidity: ${dayFourHumidity}%
        </div>
      </div>
      `);

      var dayFiveForecastCardDiv = $("<div>");
      var dayFiveDate = moment(response.list[35].dt_txt).format("MM/DD/YYYY");
      var dayFiveTemp = response.list[35].main.temp;
      var dayFiveHumidity = response.list[35].main.humidity;
      var dayFiveForecastIcon = response.list[35].weather[0].icon;
      var dayFiveForecastConditionImgSource = "http://openweathermap.org/img/wn/" + dayFiveForecastIcon + ".png";

      dayFiveForecastCardDiv.html(`
      <div class="card-body text-white bg-primary mb-3" style="max-width: 18rem;">
        <h5 class="card-title">${dayFiveDate}</h5>
        <img src=" ${dayFiveForecastConditionImgSource}" alt="forecastConditionIcon"> <img>
        <div class="card-text">
          Temp: ${dayFiveTemp}&deg;F
        </div>
        <div class="card-text">
        Humidity: ${dayFiveHumidity}%
        </div>
      </div>
      `);

      $("#forecast").append(dayOneforecastCardDiv).append(dayTwoforecastCardDiv).append(dayThreeforecastCardDiv).append(dayFourForecastCardDiv).append(dayFiveForecastCardDiv);

    });
  } // end of future forecast cards

  //start of search btn event listener
  $("#search-button").on("click", function () {
    var inputCityName = $("#search-value").val().trim();
    $(".history").append(`<ul> ${inputCityName} </ul>`);
    getCurrentCondition(inputCityName);
    getFutureForecast();
  }); // end of search btn event listener
}); // end of doc ready function

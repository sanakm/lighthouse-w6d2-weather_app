var WEATHERKEY = "3f6ec05eac466d2c" 

var data = [];
// var resultTemplate = $('#resultTemplate').html();
var weatherTemplate = $('#forecastTemplate').html();


// function blah(res) {
//   console.log("hahahah", res);
// }

function fetchCities(cityName) {
  $.ajax({
    url: 'http://autocomplete.wunderground.com/aq?query=' + cityName,
    type: 'GET',
    data: {q: cityName},
    dataType : "jsonp",
    jsonp: "cb"
  }).done(function(res) {
    console.log(res);
    data = res['RESULTS'];
    console.log(data)
   displayResult();
  });
}

function displayResult() {
  var $searchResults = $('#search-results');

  $searchResults.html('');
// clears before you search again
  data.forEach(function(city) {
    var template = Handlebars.compile($("#resultTemplate").html());
    var html = template(city);
    $searchResults.append(html);
  });
}

function fetchWeather($el, cityName) {

  $.getJSON('http://api.wunderground.com/api/3f6ec05eac466d2c/conditions/q/' + cityName + '.json', function( data) {
    console.log(data)
  })
  // console.log("fetchWeather")
  // // var weatherID = $el.closest('li').data('weather-id');
  // // console.log(weatherID)
  // $.ajax({
  //   url: 'http://api.wunderground.com/api/3f6ec05eac466d2c/conditions/q/' + cityName + '.json',
  //   headers: { 'Authorization': 'Token ' + WEATHERKEY},
  //   dataType : "jsonp",
  //   jsonp: "cb"
  // }).done(function(res) {
  //   console.log("done")
  //   debugger;
  //   res.result.forEach(function(weather) {
  //     var template = $el.parent().find('.weather-description');
  //     var html = Handlebars.compile(weatherTemplate)(inv);
  //     template.append(html);
  //   })
  // }).fail(function (error1, error2) {
  //       console.log(error1)
  //       console.log(error2)
  //   });
};

$(document).ready(function() {
  $('#search-box').on('keyup', _.debounce(function(e) {
    var cityName = $(this).val();
    if(cityName.length < 3) return;

    console.log(cityName)
    fetchCities(cityName);
  }, 100));

  $('#search-results').on('click', function(e) {
    var $el = $(e.target);
    cityName = $el.data().city.split(", ").reverse().join("/")
    if( $el.hasClass('weather-btn') ) {
      fetchWeather($el, cityName);
    }
  });
});
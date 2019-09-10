import { WeatherService} from './weather-service.js';
import { Giphy} from './weather-service.js';
$(document).ready(function() {
  $('#weatherLocation').click(function() {
    const city = $('#location').val();
    $('#location').val("");

    let weatherService = new WeatherService()
    let promise = weatherService.getWeatherByCity(city)// code moved to _weather-service.js_

    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in temperature is ${body.main.temp} degrees.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
  $("#seattle").click(function(){
    const seattle = $("#seattle").val()
    let weatherForSeattle = new WeatherService()
    let promise = weatherForSeattle.getWeatherByCity(seattle)
    promise.then(function(response) {
      const body = JSON.parse(response);
      $('.showHumidity').text(`The humidity in ${seattle} is ${body.main.humidity}%`);
      $('.showTemp').text(`The temperature in temperature is ${body.main.temp} degrees.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  })

  $("#okay").click(function(){
    const cityNames = ["Seattle","Portland","Arkansas"]
    cityNames.forEach(function(cityN){
      console.log(cityN)
      let giphy1 = new Giphy();
      let promise = giphy1.getGiphy(cityN);
      console.log(promise)
      promise.then(function(response){
        let giphyBody = JSON.parse(response);
        $("body").prepend(`<img src=${giphyBody.data[0].images.original.url}/>`)
      }, function(error){
        console.log(error)
      })
})
  const cityIDArray = ["4720131","5809844","5812944","5814043"]
  let newWeather = new WeatherService()
  cityIDArray.forEach(function(city1){
    let promise = newWeather.getWeatherByID(city1);
    console.log(promise)
    promise.then(function(response){
      let cityBody = JSON.parse(response);
      cityNames.push(cityBody.name)
      console.log(cityNames)
      $("body").append(`We will be updating ${cityBody.name}.`) ;
    },
    function(error){
      console.log(error)
      console.log(error.message)
    }
  )
})
});
})

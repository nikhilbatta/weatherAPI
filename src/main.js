import { WeatherService} from './weather-service.js';
import { Giphy} from './weather-service.js';
$(document).ready(function() {
  $('#okay').click(function() {
    let cityIDArray =  buildIDArray();
    let weatherDataArray = callWeatherAPI(cityIDArray);
    console.log(weatherDataArray)

    // call weather API and suff in city id array
    console.log(cityIDArray)
  });
});

function buildIDArray(){
  let cityNames = []
  $("input:checkbox[name=cityRadio]:checked").each(function(){
    var city = $(this).val();
    cityNames.push(city);
  })
  let cityIds = [
    ["Seattle",5809844],
    ["New York", 5128638],
    ["Portland", 4975802],
    ["Los Angeles",5368361],
    ["Lacey",5800112]
  ]
  let cityIdsMap = new Map(cityIds);
  let cityIDArray = cityNames.map(x => cityIdsMap.get(x));
  return cityIDArray;


}

function callWeatherAPI(cityIDArray){
  let weatherData = []
  cityIDArray.forEach(function(id){
    let weatherService = new WeatherService()
    let promise = weatherService.getWeatherByID(id)
    promise.then(function(response){
      const body = JSON.parse(response);
      weatherData.push(body.main.temp);
     }, function(error){
        console.log(error)
      })
  })
  return weatherData;
}
//
//   let weatherService = new WeatherService()
//   let promise = weatherService.getWeatherByCity(city)// code moved to _weather-service.js_
//
//   promise.then(function(response) {
//     const body = JSON.parse(response);
//     $('.showHumidity').text(`The humidity in ${city} is ${body.main.humidity}%`);
//     $('.showTemp').text(`The temperature in temperature is ${body.main.temp} degrees.`);
//   }, function(error) {
//     $('.showErrors').text(`There was an error processing your request: ${error.message}`);
//   });
// });
//
//
//
// })
// const cityIDArray = ["4720131","5809844","5812944","5814043"]
// let newWeather = new WeatherService()
// cityIDArray.forEach(function(city1){
//   let promise = newWeather.getWeatherByID(city1);
//   console.log(promise)
//   promise.then(function(response){
//     let cityBody = JSON.parse(response);
//     console.log(cityNames);
//     giphyByCityName(cityBody.name);
//     $("body").append(`We will be updating ${cityBody.name}.`) ;
//   },
//   function(error){
//     console.log(error)
//     console.log(error.message)
//   }
// )
// })
// });
// })
//
//
// function giphyByCityName {
//   console.log(cityN)
//   let giphy1 = new Giphy();
//   let promise = giphy1.getGiphy(cityN);
//   console.log(promise)
//   promise.then(function(response){
//     let giphyBody = JSON.parse(response);
//     $("body").prepend(`<img src=${giphyBody.data[0].images.original.url}/>`)
//   }, function(error){
//     console.log(error)
//   })
// }

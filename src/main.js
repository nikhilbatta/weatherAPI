import { WeatherService} from './weather-service.js';
import { Giphy} from './weather-service.js';
$(document).ready(function() {
  $('#okay').click(function() {
    let cityIDArray =  buildIDArray();
    let weatherPromises =[];
    let weatherDataArray = [];

    cityIDArray.forEach(id => {
      weatherPromises.push(callWeatherAPI(weatherDataArray, id));
    });
    console.log(weatherPromises);

    Promise.all(weatherPromises).then((function(values) {
      console.log(weatherDataArray);

      weatherDataArray.forEach(function(element, i) {
        console.log(element);
        $(`#output${i+1}`).html(displayCityInfo(element, i)).show();
      })
    }));
  });
});

function buildIDArray(){
  let cityNames = [];
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

function callWeatherAPI(weatherDataArray, id){
    let weatherService = new WeatherService();
    let promise = weatherService.getWeatherByID(id);
    console.log(promise);
    promise.then(function(response){
      const body = JSON.parse(response);
      console.log(body.main);
      weatherDataArray.push(body);
     }, function(error){
        console.log(error)
      })
  return promise;
}
function displayCityInfo(element, i){
  let newHtml = "";
  let temp = Math.round((element.main.temp - 273.15) *10) /10;
  console.log('check');
  newHtml += `<h1> ${element.name} </h1>`;
  newHtml += `<h2> ${element.weather[0].description} </h2>`
  newHtml += `<h3> ${temp} </h3>`
  newHtml += `<h3> ${element.main.humidity} </h3>`
  return newHtml;
}

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

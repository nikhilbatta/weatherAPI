import { WeatherService} from './weather-service.js';
import { Giphy} from './weather-service.js';
$(document).ready(function() {
  $('#okay').click(function() {
    let cityIDArray =  buildIDArray();
    let i = 0;
    cityIDArray.forEach(id => {
      callWeatherAPI(id)
      .then(function(response){
        const weatherData = JSON.parse(response);
        i++;
        console.log(i)
        $(`div#output${i}`).html(displayCityInfo(weatherData));
        return callGiphyAPI(weatherData.name);
      })
      .then(function(response){
        const giphyBody = JSON.parse(response);
        console.log(giphyBody)
        let giphyImage = giphyBody["data"][0]["images"]["downsized"]["url"]
        $(`div#output${i}`).append(`<img src='${giphyImage}'>`);
      })
    })
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
function callWeatherAPI(id){
  let weatherService = new WeatherService();
  let promise = weatherService.getWeatherByID(id);
  return promise;
}


function displayCityInfo(element){
  let newHtml = "";
  let temp = Math.round((element.main.temp - 273.15) *10) /10;
  newHtml += `<h1> ${element.name} </h1>`;
  newHtml += `<h2> ${element.weather[0].description} </h2>`
  newHtml += `<h3> ${temp} </h3>`
  newHtml += `<h3> ${element.main.humidity} </h3>`
  return newHtml;
}
function callGiphyAPI(name){
  let giphy = new Giphy();
  let promise = giphy.getGiphyByCity(name);
  return promise;
}

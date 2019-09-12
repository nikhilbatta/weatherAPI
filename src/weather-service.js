export class WeatherService {
  getWeatherByID(city1){
    return new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      const url = `http://api.openweathermap.org/data/2.5/weather?id=${city1}&APPID=${process.env.API_KEY}`
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    })
  }
}


export class Giphy {
  getGiphyByCity(giphy1){
    return new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      const url = `http://api.giphy.com/v1/gifs/search?q=${giphy1}i&api_key=${process.env.GIPHY_API_KEY}`
      request.onload = function(){
        if(this.status === 200){
          resolve(request.response)
        } else {
          reject(Error(request.statusText))
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}

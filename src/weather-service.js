export class WeatherService {
  getWeatherByCity(city) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
  getWeatherByID(city1){
    return new Promise(function(resolve,reject){
      let request = new XMLHttpRequest();
      const url = `http://api.openweathermap.org/data/2.5/weather?id=${city1}&APPID=`
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
export class Giphy{
      getGiphyByCity(giphy1){
        return new Promise(function(resolve,reject){
          let request = new XMLHttpRequest();
          const url = `http://api.giphy.com/v1/gifs/search?q=${giphy1}i&api_key=`
          request.onload = function(){
            if(this.status === 200){
              resolve(request.response)
              console.log(this.status)
            } else {
              console.log(this.status)
              reject(Error(request.statusText))
            }
          }
          request.open("GET", url, true);
          request.send();
        });
        }
      }

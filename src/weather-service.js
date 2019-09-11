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
      const url = `http://api.openweathermap.org/data/2.5/weather?id=${city1}&APPID=4641ce3559b229171301671ee8722601`
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
      getGiphy(giphy1){
        return new Promise(function(resolve,reject){
          let request = new XMLHttpRequest();
          const url = `http://api.giphy.com/v1/gifs/search?q=${giphy1}i&api_key=GarghQLp0bL3BhOfYvD0eLdP0TXGMzFD&limit=5`
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

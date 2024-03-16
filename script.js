document.getElementById('search-button').addEventListener('click', function() {
    var city = document.getElementById('search-input').value;
    fetchWeather(city);
  });
  function fetchWeather(city) {
    var apiKey = 'f14a9cc71b9dc247581fe915a9319baf'; 
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        showWeather(data);
      })
      .catch(error => {
        console.log('Error fetching weather:', error);
      });
  }
  function showWeather(data) {
    var weatherInfo = document.getElementById('weather-info');
    var windDirection = convertDegreesToDirection(data.wind.deg);
  
    weatherInfo.innerHTML = `
      <h2>${data.name}</h2>
      <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Weather: ${data.weather[0].main}</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
      <p>Wind Direction: ${windDirection}</p>
    `;
  }
  
  function convertDegreesToDirection(degrees) {
    var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    var index = Math.round(degrees / 45) % 8;
    return directions[index];
  }
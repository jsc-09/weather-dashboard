let fetchButton = document.getElementById('fetch-button');
let input = document.querySelector('.inputValue');
let searchLocation = document.getElementById('searchlocation');
let todayTemp = document.getElementById('todaytemp');
let todayWind = document.getElementById('todaywind');
let todayHumidity = document.getElementById('todayhumidity');
let todayUv = document.getElementById('todayuv');
let icon = document.getElementById('icon');


const apiKey = "b0ce11bf2a4fc3e650c06aa56d4e2b0c";

fetchButton.addEventListener('click', function() {
    let inputValue = input.value;

//REQUEST CURRENT WEATHER
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=imperial`;

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
        console.log(data);

        let locationSearch = document.createElement('h2');
        locationSearch.textContent = data.name;
        searchLocation.append(locationSearch);

        const icon = `http://openweathermap.org/img/wn/${
            data.weather[0]["icon"]
          }.png`;
        let iconImg = document.createElement('img');
        iconImg.src = icon;
        searchLocation.append(iconImg);
        console.log(iconImg)

        let tempToday = document.createElement('h4');
        tempToday.textContent = 'Temp: ' + data.main.temp; + '\xB0F';
        todayTemp.append(tempToday)

        let windToday = document.createElement('h4');
        windToday.textContent = 'Wind: ' + data.wind.speed + 'MPH';
        todayWind.append(windToday)

        let humidityToday = document.createElement('h4');
        humidityToday.textContent = 'Humidity: ' + data.main.humidity + '%';
        todayHumidity.append(humidityToday);

        let latitudeValue = data.coord.lat
        let longitudeValue = data.coord.lon

        const uvUrl =  `https://api.openweathermap.org/data/2.5/onecall?lat=${latitudeValue}&lon=${longitudeValue}&appid=${apiKey}`;

        fetch (uvUrl)
        .then(function (response) {
            return response.json();
          })
        .then(function (uvdata) {
            console.log(uvdata);

            let uvToday = document.createElement('h4');
            uvToday.textContent = 'UV Index: ' + uvdata.current.uvi;
            todayUv.append(uvToday)    
        });
      });


//REQUEST 5 DAY FORECAST
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${inputValue}&appid=${apiKey}&units=imperial`;

      fetch(forecastUrl)
      .then(function (r) {
          return r.json();
      })
      .then(function (forecast) {
          console.log(forecast);
      });
});
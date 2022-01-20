let fetchButton = document.getElementById('fetch-button');
let input = document.querySelector('.inputValue');
let searchLocation = document.getElementById('searchlocation');
let todayTemp = document.getElementById('todaytemp');
let todayWind = document.getElementById('todaywind');
let todayHumidity = document.getElementById('todayhumidity');
let todayUv = document.getElementById('todayuv');


const apiKey = "b0ce11bf2a4fc3e650c06aa56d4e2b0c";

fetchButton.addEventListener('click', function() {
    let inputValue = input.value;
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=imperial`;

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
        console.log(data);

        let locationSearch = document.createElement('h2');
        locationSearch.textContent = inputValue;
        console.log(inputValue);
        searchLocation.append(locationSearch);


        let tempToday = document.createElement('h4');
        tempToday.textContent = 'Temp: ' + data.main.temp; + '\xB0F';
        console.log(tempToday);
        todayTemp.append(tempToday)
      });


}) 

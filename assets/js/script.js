//require('dotenv').config();

let fetchButton = document.getElementById('fetch-button');
let input = document.querySelector('.inputValue');
let todayUv = document.getElementById('todayuv');
let searchHistoryEl = document.getElementById('searchHistory')

const apiKey = "b0ce11bf2a4fc3e650c06aa56d4e2b0c";

fetchButton.addEventListener('click', function() {
    let inputValue = input.value;
    populateDisplay(inputValue);
    searchHistory(inputValue);
});

//Render Search History 

function searchHistory (pizza) {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    if (history.indexOf(pizza) !== -1) return;
    history.push(pizza)
    localStorage.setItem('history', JSON.stringify(history))
    renderHistoryButton();
}

//Create Buttons from Search History

function renderHistoryButton () {
    let history = JSON.parse(localStorage.getItem('history')) || [];
    searchHistoryEl.innerHTML= "";
    history.forEach(function (element) {
        let tempButton = document.createElement('button');
        tempButton.textContent = element;
        searchHistoryEl.append(tempButton);
    })
}

function populateDisplay (inputValue) {
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=imperial`;

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        let locationSearch = document.getElementById('city');
        locationSearch.textContent = data.name;

        const icon = `http://openweathermap.org/img/wn/${
            data.weather[0]["icon"]
        }.png`;
        let iconImg = document.getElementById('icon');
        iconImg.src = icon;

        let tempToday = document.getElementById('temp');
        tempToday.textContent =  data.main.temp + '\xB0 F';
//
        let windToday = document.getElementById('wind');
        windToday.textContent = data.wind.speed + 'MPH';

        let humidityToday = document.getElementById('humidity');
        humidityToday.textContent = data.main.humidity + '\%';

        let latitudeValue = data.coord.lat
        let longitudeValue = data.coord.lon

        const uvUrl =  `https://api.openweathermap.org/data/2.5/onecall?lat=${latitudeValue}&lon=${longitudeValue}&appid=${apiKey}`;

        fetch (uvUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (uvdata) {
            console.log(uvdata);

            let uvIndex = uvdata.current.uvi;
            let uvToday = document.getElementById('uvi');
            uvToday.textContent = uvIndex;
            
            if (uvIndex <= 2) {
                uvToday.style.backgroundColor = "green";
            }
            else if  (uvIndex <= 5 && uvIndex >= 3 ){
                uvToday.style.backgroundColor = "yellow";
            }    
            else if  (uvIndex <= 7 && uvIndex >= 6 ){
                uvToday.style.backgroundColor = "orange";
            }    
            else {
                uvToday.style.backgroundColor = "red";
            }    
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

}




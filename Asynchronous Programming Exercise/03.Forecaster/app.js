function attachEvents() {
    const symbols = {
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°'
    }
    let locationCode = '';

    let submitButton = document.querySelector('#submit');
    submitButton.addEventListener('click', onClick);

    function onClick() {
        //clear fields from previous data
        let todayWeatherDivToClear = document.querySelector('.forecast');
        let threeDayWeatherDivToClear = document.querySelector('.forecast-info');
        if (todayWeatherDivToClear && threeDayWeatherDivToClear) {
            todayWeatherDivToClear.remove();
            threeDayWeatherDivToClear.remove();
        }
        //new requests, compose and handle for html elements from this point
        let locationInput = document.querySelector('#location').value;
        fetch('http://localhost:3030/jsonstore/forecaster/locations')
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error();
                }
            })
            .then(locations => {
                let location = locations.find(x => x.name == locationInput);
                if (location == undefined) {
                    throw new Error();
                }
                locationCode = location.code;
                todayWeatherRequest(locationCode);
                threeDayWeatherRequest(locationCode);
            })
            .catch(() => {
                errorHandler();
            });
    }

    function todayWeatherRequest(locationCode) {
        let cityName = '';
        let lowTemp = 0;
        let highTemp = 0;
        let condition = '';
        fetch(`http://localhost:3030/jsonstore/forecaster/today/${locationCode}`)
            .then(res => res.json())
            .then(todayData => {
                cityName = todayData.name;
                lowTemp = todayData.forecast.low;
                highTemp = todayData.forecast.high;
                condition = todayData.forecast.condition;
                todayWeatherComposer(cityName, lowTemp, highTemp, condition);
            })
    }

    function threeDayWeatherRequest(locationCode) {
        fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${locationCode}`)
            .then(res => res.json())
            .then(threeDayDataObj => {
                threeDayWeatherComposer(threeDayDataObj);
            })
    }

    function todayWeatherComposer(cityName, lowTemp, highTemp, condition) {
        document.querySelector('#forecast').style.display = 'block';
        let currentWeatherDiv = document.querySelector('#current');
        let forecastsDivElement = document.createElement('div');
        forecastsDivElement.className = 'forecast';
        let conditionSymbolSpan = document.createElement('span');
        conditionSymbolSpan.className = 'condition symbol';
        switch (condition) {
            case 'Sunny': conditionSymbolSpan.textContent = symbols.Sunny;
                break;
            case 'Partly sunny': conditionSymbolSpan.textContent = symbols['Partly sunny'];
                break;
            case 'Overcast': conditionSymbolSpan.textContent = symbols.Overcast;
                break;
            case 'Rain': conditionSymbolSpan.textContent = symbols.Rain;
                break;
        }
        let conditionSpan = document.createElement('span');
        conditionSpan.className = 'condition';
        let cityNameSpan = document.createElement('span');
        cityNameSpan.className = 'forecast-data';
        cityNameSpan.textContent = cityName;
        let tempSpan = document.createElement('span');
        tempSpan.className = 'forecast-data';
        tempSpan.textContent = `${lowTemp}${symbols.Degrees}/${highTemp}${symbols.Degrees}`;
        let weatherTypeSpan = document.createElement('span');
        weatherTypeSpan.className = 'forecast-data';
        weatherTypeSpan.textContent = condition;
        conditionSpan.appendChild(cityNameSpan);
        conditionSpan.appendChild(tempSpan);
        conditionSpan.appendChild(weatherTypeSpan);
        forecastsDivElement.appendChild(conditionSymbolSpan);
        forecastsDivElement.appendChild(conditionSpan);
        currentWeatherDiv.appendChild(forecastsDivElement);
    }

    function threeDayWeatherComposer(weatherObj) {
        let upcomingDivElement = document.querySelector('#upcoming');
        let forecastInfoDivElement = document.createElement('div');
        forecastInfoDivElement.className = 'forecast-info';
        weatherObj.forecast.forEach(day => {
            forecastInfoDivElement.appendChild(dayComposer(day.condition, day.high, day.low));
        });
        upcomingDivElement.appendChild(forecastInfoDivElement);
    }

    function dayComposer(condition, highTemp, lowTemp) {
        let upcomingSpan = document.createElement('span');
        upcomingSpan.className = 'upcoming';
        let symbolSpan = document.createElement('span');
        symbols.className = 'symbol';
        switch (condition) {
            case 'Sunny': symbolSpan.textContent = symbols.Sunny;
                break;
            case 'Partly sunny': symbolSpan.textContent = symbols['Partly sunny'];
                break;
            case 'Overcast': symbolSpan.textContent = symbols.Overcast;
                break;
            case 'Rain': symbolSpan.textContent = symbols.Rain;
                break;
        }
        let tempSpan = document.createElement('span');
        tempSpan.className = 'forecast-data';
        tempSpan.textContent = `${lowTemp}${symbols.Degrees}/${highTemp}${symbols.Degrees}`;
        let weatherTypeSpan = document.createElement('span');
        weatherTypeSpan.className = 'forecast-data';
        weatherTypeSpan.textContent = condition;
        upcomingSpan.appendChild(symbolSpan);
        upcomingSpan.appendChild(tempSpan);
        upcomingSpan.appendChild(weatherTypeSpan);

        return upcomingSpan;
    }

    function errorHandler(){
        document.querySelector('#forecast').style.display = 'block';
        document.querySelector('#forecast').textContent = 'Error';
        document.querySelector('#forecast').style.textAlign = 'center';
    }
}

attachEvents();
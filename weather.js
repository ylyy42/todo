const weather = document.querySelector('.js-weather');

const COORDS = 'coords';
const API_KEY = '241051bf13976dd3ddf8b8d9f247255e';

function getWeather(coords){
    console.log(coords)
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
    return response.json();
}).then(function(json){
    const temperature = json.main.temp;
    const place = json.name;
    weather.innerText = `${temperature} @ ${place}`
})
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude : latitude,
        longitude : longitude
        // latitude,
        // longitude -> 이렇게 쓸수도 있음.
    }
}

function handleGeoError(){
    console.log('cant access geo location')
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError) //나의위치정보를 읽다.
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords);
        return;
    }
}

function init(){
    loadCoords();
}

init();
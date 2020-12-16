let now=new Date();
let currentDate=document.querySelector("#currentDate")
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day=days[now.getDay()];
let hours=now.getHours();
if (hours<10){
    hours=`0${hours}`
}
let minutes=now.getMinutes();
if (minutes<10){
    minutes=`0${minutes}`
}
currentDate.innerHTML=`${day} ${hours}:${minutes}`

function formatHours(timestamp){
let now=new Date(timestamp);
let hours=now.getHours();
if (hours<10){
    hours=`0${hours}`
}
let minutes=now.getMinutes();
if (minutes<10){
    minutes=`0${minutes}`
}
return `${hours}:${minutes}`;
}

let tempResponse=null;

function showTemperatureCelcius(response){
tempResponse=Math.round(response.data.main.temp);
let currentTemperature=document.querySelector("#current-temp");
currentTemperature.innerHTML=`${tempResponse}`;
let location=response.data.name;
let city=document.querySelector("h1.city");
city.innerHTML=`${location}`;
let input= document.querySelector("#city-selector");
input.value=`${location}`;
let celcius=document.querySelector("#celcius");
let fahr=document.querySelector("#fahr");
celcius.innerHTML= `<span class="selected" >ºC</span>`;
fahr.innerHTML=`<span class="no-selected">ºF</span>`;
let iconElement=document.querySelector("#icon");
iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

let humidity= Math.round(response.data.main.humidity);
let currentHumidity=document.querySelector("#humidity");
currentHumidity.innerHTML=`${humidity}`;

let wind=Math.round(response.data.wind.speed);
let currentWind=document.querySelector("#wind");
currentWind.innerHTML=`${wind}`;

let minTemp=Math.round(response.data.main.temp_min);
let currentMinTemp=document.querySelector("#min-temp");
currentMinTemp.innerHTML=`${minTemp}`;

let maxTemp=Math.round(response.data.main.temp_max);
let currentMaxTemp=document.querySelector("#max-temp");
currentMaxTemp.innerHTML=`${maxTemp}`;

console.log(response.data);

let description=response.data.weather[0].description;
let currentDescription=document.querySelector("#description");
currentDescription.innerHTML=`${description}`;
}

function chooseFahr(event){
event.preventDefault();
let temperature=document.querySelector("#current-temp");
let temp=`${tempResponse}`;
let tempFahr=Math.round((temp)*9/5+32);
temperature.innerHTML=tempFahr;
let celcius=document.querySelector("#celcius");
let fahr=document.querySelector("#fahr");
celcius.innerHTML= `<span class="no-selected" >ºC</span>`;
fahr.innerHTML=`<span class="selected">ºF</span>`;
}

let celcius=document.querySelector("#celcius");
celcius.addEventListener("click", enterCity);

let fahr=document.querySelector("#fahr");
fahr.addEventListener("click", chooseFahr);

function showForecast(response){
    let forecast=null;
    let forecastElement=document.querySelector("#fiveDays");
    forecastElement.innerHTML=null;

    for(let index=0; index<6 ;index++){
        forecast=response.data.list[index];
        forecastElement.innerHTML +=`
    
    <div class="col-2">
        <h5>${formatHours(forecast.dt*1000)}</h5>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="forecast" width="50px" />
        <h5>${Math.round(forecast.main.temp)}ºC</h5>
    </div>`;
    }   
}

function enterCity(event){
event.preventDefault();
let input= document.querySelector("#city-selector");
let h1=document.querySelector("h1.city");
let temp=document.querySelector("#current-temp");
let currentHumidity=document.querySelector("#humidity");
let currentWind=document.querySelector("#wind");
let currentMinTemp=document.querySelector("#min-temp");
let currentMaxTemp=document.querySelector("#max-temp");


if (input.value){
h1.innerHTML=`${input.value}`;
}else{
 h1.innerHTML=`Choose city`; 
 temp.innerHTML="T";
 currentHumidity.innerHTML="humidity";
 currentWind.innerHTML="wind";
 currentMinTemp.innerHTML="minTemp";
 currentMaxTemp.innerHTML="maxTemp";
}

let apiKey="3cd100e112e7defa0b76141c9b64f0fc";
let city=h1.innerHTML;
let units="metric";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showTemperatureCelcius);

apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(showForecast);
}

let citySearch=document.querySelector("form");
citySearch.addEventListener("submit", enterCity);

function currentLocationDisplay(position){
let latitude= position.coords.latitude;
let longitude=position.coords.longitude;
let apiKey="3cd100e112e7defa0b76141c9b64f0fc";
let units="metric";
let locationUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

axios.get(locationUrl).then(showTemperatureCelcius);

locationUrl=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
axios.get(locationUrl).then(showForecast);
}

function showLocationTemp() {
navigator.geolocation.getCurrentPosition(currentLocationDisplay);
}

let currentLocation=document.querySelector("#current-location");
currentLocation.addEventListener("click", showLocationTemp);

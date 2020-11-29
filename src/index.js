let now=new Date();
let currentDate=document.querySelector("#currentDate")
let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day=days[now.getDay()];
let hours=now.getHours();
let minutes=now.getMinutes();
currentDate.innerHTML=`${day} ${hours}:${minutes}`


function showTemperatureCelcius(response){
let tempResponse=Math.round(response.data.main.temp);
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
}

function chooseFahr(event){
event.preventDefault();
let temperature=document.querySelector("#current-temp");
let temp=Number(temperature.innerHTML);
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
}

function showLocationTemp() {
navigator.geolocation.getCurrentPosition(currentLocationDisplay);
}

let currentLocation=document.querySelector("#current-location");
currentLocation.addEventListener("click", showLocationTemp);

import { useState,useEffect } from "react";
import { useCity } from "../context/CityContext";

function Weather() {
   const {city} = useCity();
   const [cityWeather, setCityWeather] = useState({
       current:{dt:"",temp:"",weather:[], humidity:""},
       hourly:[],
       daily:[]
   });
   const [location, setLocation] = useState();
   const APIKEY ="f579fda46a9c10ff1041d051f32f3d31";

async function getLocation(){
    navigator.geolocation.getCurrentPosition(async function(position) {
        return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely&appid=${APIKEY}&units=metric&lang=tr`)
                                .then(res => res.json())
                                .then(res => setCityWeather({current:res.current, hourly:res.hourly,daily:res.daily}));  
    }); 
    alert("Konumunuza izin vererek şehrinizdeki hava durumunu hemen öğrenebilirsiniz!");
    setLocation(location);
}
  
async function getWeatherData  () { 
    const cityCoordinate = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=tr&&appid=${APIKEY}&units=metric&lang=tr`).then(res => res.json())
    return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityCoordinate.coord.lat}&lon=${cityCoordinate.coord.lon}&exclude=minutely&appid=${APIKEY}&units=metric&lang=tr`)
                                .then(res => res.json())
                                .then(res => setCityWeather({current:res.current, hourly:res.hourly,daily:res.daily}));         
}

useEffect(() => {
    getLocation();
}, [location])   //when "location permission" gets from user the function get called

useEffect(() => {
    getWeatherData();
}, [city])   //when "city" change the function get called

function getHour(unix_timestamp){  //get today hours from API and convert to real clock time
    
    let date = new Date(unix_timestamp * 1000);
    let hours = "0" + date.getHours();
    let minutes = "0" + date.getMinutes();

    let formattedTime = hours.substr(-2) + ':' + minutes.substr(-2);
 
    return formattedTime;    
}

function getToday(unix_timestamp){  //get today date from API and convert to real clock time
    
    let date = new Date(unix_timestamp * 1000);
    let hours = "0" + date.getHours();
    let minutes = "0" + date.getMinutes();
    let options = {weekday: 'long'};
    let today = new Intl.DateTimeFormat('tr-TR', options).format(date);
    let options2 = {month: 'long'};
    let month = new Intl.DateTimeFormat('tr-TR', options2).format(date);
    let monthDay = date.getDate();

    let formattedTime = monthDay + ' ' + month + ' ' + today +  ', ' + hours.substr(-2) + ':' + minutes.substr(-2);
 
    return formattedTime;    
}

function getWeek(unix_timestamp){  //get all week date from API and convert to real clock time
    let date = new Date(unix_timestamp * 1000);
    let options = {weekday: 'long'};
    let today = new Intl.DateTimeFormat('tr-TR', options).format(date);

    let formattedTime =  today;
 
    return formattedTime;    
}

return(
    <div className="container">
        <div className="main">
            <div className="current">
                <div className="current-weather">
                    {getToday(cityWeather.current.dt)}
                    <br />
                    <span>{Math.floor(cityWeather.current.temp)}°</span>
                    <br />
                    {cityWeather.current.humidity}% Nem
                </div>
                {cityWeather.current.weather.slice(0,1).map((current,index) => {
                    return(
                        <div key={index}>
                            <img src={`https://openweathermap.org/img/wn/${current.icon}@4x.png`} alt="" style={{width:150}}/>
                            <p style={{marginTop:-30}}>{current.description.toUpperCase()} </p>
                        </div>
                    )
                })} 
            </div>

            <div className="hourly">
                {cityWeather.hourly.slice(1,9).map((hourly,index) => {
                    return (
                            <div key={index}>
                               {getHour(hourly.dt)}
                               <br />
                               {hourly.weather.map((hour,index) =>{
                                   return(
                                       <div key={index}>
                                           <img src={`https://openweathermap.org/img/wn/${hour.icon}@4x.png`} alt="" className="weather-img"/>
                                       </div>
                                   )
                               })}
                               <span style={{fontWeight:"600",fontSize:18}}>{Math.floor(hourly.temp)}°</span>
                           </div>
                    )
                })}
            </div>    
            
            <div className="week">
            {cityWeather.daily.slice(1,6).map((daily,index) => {  //First slice array cause listing will start from tomorrow here
                return (
                        <div key={index} className="week-day">
                            <p style={{fontWeight:"bold"}}>{getWeek(daily.dt)} </p>
                            <span style={{fontWeight:"600", fontSize:18}}>{Math.floor(daily.temp.max)}°</span> / <span style={{color:"#484848", fontWeight:"600"}}>{Math.floor(daily.temp.min)}°</span> 
                            <br />
                            {daily.humidity}% Nem
                            <br />
                            {daily.weather.map((day,index) => {
                                return (
                                        <div key={index}>
                                           <img src={`https://openweathermap.org/img/wn/${day.icon}@4x.png`} alt="" className="weather-img"/>
                                           <br />
                                           {day.description.slice(0,1).toUpperCase() + day.description.slice(1)}
                                           <br />
                                       </div>
                                )
                            })}
                        </div>
                    )
                })}
        </div>
        </div>
    </div>
    )
}

export default Weather


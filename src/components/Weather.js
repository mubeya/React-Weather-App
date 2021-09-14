import { useState,useEffect } from "react";
import { useCity } from "../context/CityContext";

function Weather() {
   const {city, setCity} = useCity();
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
    setLocation(location);
}
  
async function getWeatherData  () { 
    const cityCoordinate = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=tr&&appid=${APIKEY}&units=metric&lang=tr`).then(res => res.json())
    return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityCoordinate.coord.lat}&lon=${cityCoordinate.coord.lon}&exclude=minutely&appid=${APIKEY}&units=metric&lang=tr`)
                                .then(res => res.json())
                                .then(res => setCityWeather({current:res.current, hourly:res.hourly,daily:res.daily}));         
}

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

function cityChange(e) {
    setCity(e.target.value);
}

useEffect(() => {
    getLocation();
}, [location])   //when "location permission" gets from user the function get called

useEffect(() => {
    getWeatherData();
}, [city])   //when "city" change the function get called


return(
    
    <div className="container">
        <h3>Hava durumunu öğrenmek için şehir aratın ↓</h3>
        <select onChange={cityChange} className = "search" name="locality">
                        <option value="Adana">Adana</option>
                        <option value="Adıyaman">Adıyaman</option>
                        <option value="Afyonkarahisar">Afyonkarahisar</option>
                        <option value="Ağrı">Ağrı</option>
                        <option value="Aksaray">Aksaray</option>
                        <option value="Amasya">Amasya</option>
                        <option value="Ankara">Ankara</option>
                        <option value="Antalya">Antalya</option>
                        <option value="Ardahan">Ardahan</option>
                        <option value="Artvin">Artvin</option>
                        <option value="Aydın">Aydın</option>
                        <option value="Balıkesir">Balıkesir</option>
                        <option value="Bartın">Bartın</option>
                        <option value="Batman">Batman</option>
                        <option value="Bayburt">Bayburt</option>
                        <option value="Bilecik">Bilecik</option>
                        <option value="Bingöl">Bingöl</option>
                        <option value="Bitlis">Bitlis</option>
                        <option value="Bolu">Bolu</option>
                        <option value="Burdur">Burdur</option>
                        <option value="Bursa">Bursa</option>
                        <option value="Çanakkale">Çanakkale</option>
                        <option value="Çankırı">Çankırı</option>
                        <option value="Çorum">Çorum</option>
                        <option value="Denizli">Denizli</option>
                        <option value="Diyarbakır">Diyarbakır</option>
                        <option value="Düzce">Düzce</option>
                        <option value="Edirne">Edirne</option>
                        <option value="Elazığ">Elazığ</option>
                        <option value="Erzincan">Erzincan</option>
                        <option value="Erzurum">Erzurum</option>
                        <option value="Eskişehir">Eskişehir</option>
                        <option value="Gaziantep">Gaziantep</option>
                        <option value="Giresun">Giresun</option>
                        <option value="Gümüşhane35">Gümüşhane</option>
                        <option value="Hakkâri">Hakkâri</option>
                        <option value="Hatay">Hatay</option>
                        <option value="Iğdır">Iğdır</option>
                        <option value="Isparta">Isparta</option>
                        <option value="İstanbul">İstanbul</option>
                        <option value="İzmir">İzmir</option>
                        <option value="Kahramanmaraş">Kahramanmaraş</option>
                        <option value="Karabük">Karabük</option>
                        <option value="Karaman">Karaman</option>
                        <option value="Kars">Kars</option>
                        <option value="Kastamonu">Kastamonu</option>
                        <option value="Kayseri">Kayseri</option>
                        <option value="Kırıkkale">Kırıkkale</option>
                        <option value="Kırklareli">Kırklareli</option>
                        <option value="Kırşehir">Kırşehir</option>
                        <option value="Kilis">Kilis</option>
                        <option value="Kocaeli">Kocaeli</option>
                        <option value="Konya">Konya</option>
                        <option value="Kütahya">Kütahya</option>
                        <option value="Malatya">Malatya</option>
                        <option value="Manisa">Manisa</option>
                        <option value="Mardin">Mardin</option>
                        <option value="Mersin">Mersin</option>
                        <option value="Muğla">Muğla</option>
                        <option value="Muş">Muş</option>
                        <option value="Nevşehir">Nevşehir</option>
                        <option value="Niğde">Niğde</option>
                        <option value="Ordu">Ordu</option>
                        <option value="Osmaniye">Osmaniye</option>
                        <option value="Rize">Rize</option>
                        <option value="Sakarya">Sakarya</option>
                        <option value="Samsun">Samsun</option>
                        <option value="Siirt">Siirt</option>
                        <option value="Sinop">Sinop</option>
                        <option value="Sivas">Sivas</option>
                        <option value="Şanlıurfa">Şanlıurfa</option>
                        <option value="Şırnak">Şırnak</option>
                        <option value="Tekirdağ">Tekirdağ</option>
                        <option value="Tokat">Tokat</option>
                        <option value="Trabzon">Trabzon</option>
                        <option value="Tunceli">Tunceli</option>
                        <option value="Uşak">Uşak</option>
                        <option value="Van">Van</option>
                        <option value="Yalova">Yalova</option>
                        <option value="Yozgat">Yozgat</option>
                        <option value="Zonguldak">Zonguldak</option>
                    </select>
       
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


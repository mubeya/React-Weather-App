import { useState,useEffect } from "react";
import { useCity } from "../context/CityContext";
import SelectSearch from "react-select-search";
import fuzzySearch from "../fuzzySearch";

function Weather() {
const {city, setCity} = useCity();
const [cityWeather, setCityWeather] = useState({
       current:{dt:"",temp:"", weather:[], humidity:""},
       hourly:[],
       daily:[]
});

const [location, setLocation] = useState();
const APIKEY ="f579fda46a9c10ff1041d051f32f3d31";

const options = [ {name: 'Adana', value: 'Adana'}, 
                  {name: 'Adıyaman', value: 'Adıyaman'},
                  {name: 'Afyonkarahisar', value: 'Afyonkarahisar'},
                  {name: 'Ağrı', value: 'Ağrı'},
                  {name: 'Aksaray', value: 'Aksaray'},
                  {name: 'Amasya', value: 'Amasya'},
                  {name: 'Ankara', value: 'Ankara'},
                  {name: 'Antalya', value: 'Antalya'},
                  {name: 'Ardahan', value: 'Ardahan'},
                  {name: 'Artvin', value: 'Artvin'},
                  {name: 'Aydın', value: 'Aydın'},
                  {name: 'Balıkesir', value: 'Balıkesir'},
                  {name: 'Bartın', value: 'Bartın'},
                  {name: 'Batman', value: 'Batman'},
                  {name: 'Bayburt', value: 'Bayburt'},
                  {name: 'Bilecik', value: 'Bilecik'},
                  {name: 'Bingöl', value: 'Bingöl'},
                  {name: 'Bitlis', value: 'Bitlis'},
                  {name: 'Bolu', value: 'Bolu'},
                  {name: 'Burdur', value: 'Burdur'},
                  {name: 'Bursa', value: 'Bursa'},
                  {name: 'Çanakkale', value: 'Çanakkale'},
                  {name: 'Çankırı', value: 'Çankırı'},
                  {name: 'Çorum', value: 'Çorum'},
                  {name: 'Denizli', value: 'Denizli'},
                  {name: 'Diyarbakır', value: 'Diyarbakır'},
                  {name: 'Düzce', value: 'Düzce'},
                  {name: 'Edirne', value: 'Edirne'},
                  {name: 'Elazığ', value: 'Elazığ'},
                  {name: 'Erzincan', value: 'Erzincan'},
                  {name: 'Erzurum', value: 'Erzurum'},
                  {name: 'Eskişehir', value: 'Eskişehir'},
                  {name: 'Gaziantep', value: 'Gaziantep'},
                  {name: 'Giresun', value: 'Giresun'},
                  {name: 'Gümüşhane', value: 'Gümüşhane'},
                  {name: 'Hakkâri', value: 'Hakkâri'},
                  {name: 'Hatay', value: 'Hatay'},
                  {name: 'Iğdır', value: 'Iğdır'},
                  {name: 'Isparta', value: 'Isparta'},
                  {name: 'İstanbul', value: 'İstanbul'},
                  {name: 'İzmir', value: 'İzmir'},
                  {name: 'Kahramanmaraş', value: 'Kahramanmaraş'},
                  {name: 'Karabük', value: 'Karabük'},
                  {name: 'Karaman', value: 'Karaman'},
                  {name: 'Kars', value: 'Kars'},
                  {name: 'Kastamonu', value: 'Kastamonu'},
                  {name: 'Kayseri', value: 'Kayseri'},
                  {name: 'Kırıkkale', value: 'Kırıkkale'},
                  {name: 'Kırklareli', value: 'Kırklareli'},
                  {name: 'Kırşehir', value: 'Kırşehir'},
                  {name: 'Kilis', value: 'Kilis'},
                  {name: 'Kocaeli', value: 'Kocaeli'},
                  {name: 'Konya', value: 'Konya'},
                  {name: 'Kütahya', value: 'Kütahya'},
                  {name: 'Malatya', value: 'Malatya'},
                  {name: 'Manisa', value: 'Manisa'},
                  {name: 'Mardin', value: 'Mardin'},
                  {name: 'Mersin', value: 'Mersin'},
                  {name: 'Muğla', value: 'Muğla'},
                  {name: 'Muş', value: 'Muş'},
                  {name: 'Nevşehir', value: 'Nevşehir'},
                  {name: 'Niğde', value: 'Niğde'},
                  {name: 'Ordu', value: 'Ordu'},
                  {name: 'Osmaniye', value: 'Osmaniye'},
                  {name: 'Rize', value: 'Rize'},
                  {name: 'Sakarya', value: 'Sakarya'},
                  {name: 'Samsun', value: 'Samsun'},
                  {name: 'Siirt', value: 'Siirt'},
                  {name: 'Sinop', value: 'Sinop'},
                  {name: 'Sivas', value: 'Sivas'},
                  {name: 'Şanlıurfa', value: 'Şanlıurfa'},
                  {name: 'Şırnak', value: 'Şırnak'},
                  {name: 'Tekirdağ', value: 'Tekirdağ'},
                  {name: 'Tokat', value: 'Tokat'},
                  {name: 'Trabzon', value: 'Trabzon'},
                  {name: 'Tunceli', value: 'Tunceli'},
                  {name: 'Uşak', value: 'Uşak'},
                  {name: 'Van', value: 'Van'},
                  {name: 'Yalova', value: 'Yalova'},
                  {name: 'Yozgat', value: 'Yozgat'},
                  {name: 'Zonguldak', value: 'Zonguldak'},
                ];

async function getLocation(){
    navigator.geolocation.getCurrentPosition(async function(position) {
        const cityName = fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${APIKEY}`)
                             .then(res => res.json())
                             .then(res => setCity(res[0].name));

        return await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely&appid=${APIKEY}&units=metric&lang=tr`)
                             .then(res => res.json())
                             .then(res => setCityWeather({current:res.current, hourly:res.hourly,daily:res.daily}));  
    }); 
    setLocation(location);
}
  
async function getWeatherData  () { 
    const cityCoordinate = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=tr&&appid=${APIKEY}&units=metric&lang=tr`)
                                .then(res => res.json())

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
}, [location])   //when "location permission" gets from user this function get called

useEffect(() => {
    getWeatherData();
}, [city])   //when "city" change the function get called


return(
    <div className="container">
        <h3>Hava durumunu öğrenmek için şehir aratın ↓</h3>

        <SelectSearch onChange={setCity} value={city} options={options} search filterOptions={fuzzySearch} placeholder={city} />
          
        <div className="main">
            <div className="current">
                <div className="current-day">
                    {city}, {getToday(cityWeather.current.dt)}
                </div>
                <div className="current-weather">
                    <div className="current-temp">
                        <span style={{fontSize:80, fontWeight:"bold"}}>{Math.floor(cityWeather.current.temp)}°</span>
                        <div>
                            <span>Nem : {cityWeather.current.humidity} %</span>
                            <br />
                            <span>Rüzgar : {Math.floor(cityWeather.current.wind_speed) * 10} km/s</span>
                        </div>
                    </div>
                    {cityWeather.current.weather.slice(0,1).map((current,index) => {  //object olduğu için bu şekilde map işlemi yapıyoruz
                    return(
                        <div key={index} className="current-img">
                            <img src={`https://openweathermap.org/img/wn/${current.icon}@4x.png`} alt="currentImage" style={{width:130}}/>
                            <p style={{marginTop:-30}}>{current.description.toUpperCase()} </p>
                        </div>
                    )
                    })}
                </div>
            </div>

            <div className="hour">
               <h4>Saatlik Hava Durumu</h4>
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
            </div>    
            
            <div className="week">
                <h4>Haftalık Hava Durumu</h4>
                <div className="weekly">
                    {cityWeather.daily.slice(1,7).map((daily,index) => {  //First slice array cause listing will start from tomorrow here
                    return (
                        <div key={index} className="week-day">
                            <p style={{fontWeight:"bold"}}>{getWeek(daily.dt)} </p>
                            <span style={{fontWeight:"600", fontSize:18}}>{Math.floor(daily.temp.max)}°</span> / <span style={{color:"rgb(208, 205, 205)", fontWeight:"600"}}>{Math.floor(daily.temp.min)}°</span> 
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
    </div>
    )
}

export default Weather


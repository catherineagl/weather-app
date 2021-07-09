import { getError, getHours, getDate } from "./utils";
import { renderApp } from "./DOM_CONTENT";
const d = document;
let tempType = '°C';
let units = 'metric';

const checkCoords = async (city) => {
    try {
        if(tempType === '°F') units = 'imperial';
        const request = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&APPID=57c314ac189ac4b6d87bcf2a8adababc`, {mode: "cors"});
        const response = await request.json();
        const {lon, lat} = response.coord;
        const cityName = response.name;
        const country = response.sys.country;
        checkWeather(lon, lat, cityName, country);
    }
    catch (err) {
        return getError(err)
    }
} 
const checkWeather = async (lon, lat, city, country) => {
    try {
        if(tempType === '°F') units = 'imperial';
        const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=${units}&appid=57c314ac189ac4b6d87bcf2a8adababc`;
        const request = await fetch(api, {mode: "cors"});
        const response = await request.json();
        d.querySelector('.bg-modal').remove();
        renderApp(response, city, country);
    }
    catch (err) {
        return getError(err)
    }
}

const formatActualData = (obj, city, country) => {
    const current = obj.current;
    const today = obj.daily[0];
    let tempDescription = current.weather[0].description,
    location = `${city}, ${country}`,
    icon = current.weather[0].icon,
    todayTemp = Math.floor(current.temp),
    feelsLikeTemp = Math.floor(current['feels_like']),
    minTemp = `${Math.floor(today.temp.min) || '-'}`,
    maxTemp = `${Math.floor(today.temp.max) || '-'}`,
    wind = `${Math.floor(current.wind_speed) || '-'}`,
    clouds = `${Math.floor(current.clouds) || '-'}`,
    humidity = `${Math.floor(current.humidity) || '-'}`,
    rain = `${Math.floor(today.rain) || '-'}`,
    type = tempType;

    const actualTempSection = {tempDescription, location, icon, todayTemp, feelsLikeTemp, minTemp, maxTemp, wind, clouds, humidity, rain, type}

    return actualTempSection;
}

const formatClockData = (obj) => {
    let today = obj.current;
    let date = getDate(today.dt, obj.timezone_offset);
    let time = getHours(today.dt, obj.timezone_offset);
    let sunrise =  getHours(today.sunrise, obj.timezone_offset);
    let sunset =  getHours(today.sunset, obj.timezone_offset);

    return {date, time, sunrise, sunset}
}

const formatDailyData = (daily) => {
    let obj = [];
    Array.from(daily).forEach((value, index) => {
        if(index > 0) {
            let temp = Math.floor(value.temp.day);
            let day = new Date(value.dt * 1000).toLocaleDateString("en", {weekday: "long",});
            let icon = value.weather[0].icon;
            let type = tempType;
            
            obj.push({temp, day, icon, type})
        }
    })
    return obj
}



export {checkCoords, checkWeather, formatActualData, formatClockData, formatDailyData, tempType}
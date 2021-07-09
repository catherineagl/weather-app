import { fromUnixTime } from 'date-fns';
import Swal from 'sweetalert2';
import { checkCoords, tempType } from './API_DATA';
import { tempFill } from './DOM_CONTENT';
const d = document;

const convertToFahrenheit = () => {
    let arr = d.querySelectorAll('.temp');
    Array.from(arr).forEach(el => {
        let celsius = Number(el.textContent);
        let fah =(celsius * 9/5) + 32;
        el.textContent = fah.toFixed();
    })
}

const convertToCelsius = () => {
    let arr = d.querySelectorAll('.temp');
    Array.from(arr).forEach(el => {
        let fah = Number(el.textContent); 
        let celsius = (fah - 32) * 5/9;
        el.textContent = celsius.toFixed();
    })
}

const getDate = (unix, offset) => {
    const date = fromUnixTime(unix + offset).toUTCString();
    let [day, month, num, year] = date.split(" ");
    let formatDate = `${day} ${month} ${num} ${year}`

    let newDate = new Date(formatDate);    
    return newDate.toLocaleDateString('en',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

const getHours = (unix, offset) => {
    const date = fromUnixTime(unix + offset).toUTCString();
    let [day, month, num, year, hour] = date.split(" ");
    let formatDate = `${day} ${month} ${num} ${year} ${hour}`

    let newDate = new Date(formatDate);
    return  newDate.toLocaleTimeString('en', 'US');
}

const getError = (err) => {
    d.querySelector('.bg-modal').remove();
    Swal.fire({
        icon: 'error',
        title: 'Oops... Something went wrong!',
        text: err,
    })
}

const changeTempType = (type) => {
    if(type) tempType = '°F';
    else tempType = '°C';

    if(tempFill === true && tempType === '°F') convertToFahrenheit();
    if(tempFill === true && tempType === '°C') convertToCelsius();
}

const callApi = (city) => {
    if(!city) return;
    checkCoords(city);
}
const changeBg = (time, sunrise, sunset) => {
    let [hour, type] = time.split(' ');
    [hour] = hour.split(':');

    let [hourSunrise] = sunrise.split(' ');
    [hourSunrise] = hourSunrise.split(':')

    let [hourSunset] = sunset.split(' ');
    [hourSunset] = hourSunset.split(':');

    if(Number(hour) >= Number(hourSunset) && type === 'PM') d.body.classList.add('dark');
    else if(Number(hour) < Number(hourSunrise) && type === 'AM') d.body.classList.add('dark');
    else d.body.classList.remove('dark')
}

export {convertToFahrenheit, convertToCelsius, getDate, getHours, getError, changeTempType, callApi, changeBg}
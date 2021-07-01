const input = document.querySelector('input[type="text"]');
const btn = document.querySelector('input[type="submit"]');
const result = document.querySelector('.result');
//fahrenheit
const lang = 'es';
//http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&APPID=57c314ac189ac4b6d87bcf2a8adababc`
/* const watchClima = async (city) => {
    try {
        const request = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=57c314ac189ac4b6d87bcf2a8adababc&lang=${lang}`, {mode: "cors"});
        const response = await request.json();
        console.log(response)
        result.innerHTML = `
            <h3>City: <b>${response.name}</b></h3>
            <h3>temp: <b>${response.main.temp}<b></h3>
            <h3>Clima: <b>${response.weather[0].description}</b></h3>
            <h3>Wind speed: <b>${response.wind.speed}</b></h3>
            <div id="icon"><img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png"</div>
        `
    }
    catch (err) {
        console.log(errr)
    }
} */

//5 dias
const watchClima = async (city) => {
    try {
        const request = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=57c314ac189ac4b6d87bcf2a8adababc&lang=${lang}&cnt=3`, {mode: "cors"});
        const response = await request.json();
        console.log(response)
        result.innerHTML = `
            <h3>City: <b>${response.name}</b></h3>
            <h3>temp: <b>${response.main.temp}<b></h3>
            <h3>Clima: <b>${response.weather[0].description}</b></h3>
            <h3>Wind speed: <b>${response.wind.speed}</b></h3>
            <div id="icon"><img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png"</div>
        `
    }
    catch (err) {
        console.log(err)
    }
}

btn.addEventListener('click', ()=> {
    watchClima(input.value)
})
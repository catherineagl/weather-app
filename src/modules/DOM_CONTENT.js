import { formatActualData, formatClockData, formatDailyData } from "./API_DATA";
import { changeBg } from "./utils";
const d = document;
let tempFill = false;

const loader = () => {
    const bgModal = d.createElement('div');
    bgModal.classList.add('bg-modal');
    const img = d.createElement('img');
    img.classList.add('loader')

    img.src = './assets/images/puff.svg';
    bgModal.appendChild(img);
    d.body.appendChild(bgModal)
};

const fillActualTempSection = (obj) => {
    const section = d.querySelector('.actual');
    section.innerHTML = null;
    let {tempDescription, location, icon, todayTemp, feelsLikeTemp, minTemp, maxTemp, wind, humidity, clouds, rain, type} = obj;
    let [city, country] = location.split(',');
    section.innerHTML = `
        <div class="card-header">
            <h3 class="description">${tempDescription}</h3>
            <div>
                <h2 class="city-name">${city} - <span class="country">${country}</span></h2>
                <div class="icon"><img src="http://openweathermap.org/img/wn/${icon}@2x.png"></div>
            </div>
        </div>
        <div class="temp-container">
            <h3 class="main-temp"><span class="temp">${todayTemp}</span>${type}</h3>
            <h3 class="second-temp">Feels Like: <span class="temp">${feelsLikeTemp}</span>${type}</h3>
        </div>
        <div class="options">
            <h3 class="min-temp"><i class="fas fa-temperature-low"></i> Min Today: <span class="temp">${minTemp}</span>${type}</h3>
            <h3 class="max-temp"><i class="fas fa-temperature-high"></i> High Today: <span class="temp">${maxTemp}</span>${type}</h3>
            <h3 class="wind"><i class="fas fa-wind"></i> Wind Speed: <span>${wind}</span>km/h</h3>
            <h3 class="humidity"><i class="fas fa-tint"></i> Humidity: <span>${humidity}%</span></h3>
            <h3 class="clouds"><i class="fas fa-cloud"></i> Clouds: <span>${clouds}%</span></h3>
            <h3 class="rain"><i class="fas fa-cloud-rain"></i> Rain chance: <span>${rain}%</span></h3>
        </div>
    `;
}

const fillClockSection = (obj) => {
    const clock = d.querySelector('.reloj');
    clock.innerHTML = null;
    let {date, time, sunrise, sunset} = obj;
    changeBg(time, sunrise, sunset);
    clock.innerHTML = `
    <div class="date">
        <div class="full-date">${date}</div>
        <div class="hours">${time}</div>
    </div>
    <div class="sun">
        <div>
            <div class="sunrise-container">
                <span>Sunrise</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sunrise" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" />
                <line x1="3" y1="21" x2="21" y2="21" />
                <path d="M12 9v-6l3 3m-6 0l3 -3" />
                </svg>
            </div>

            <div class="sunrise">${sunrise}</div>
        </div>
        <div>
            <div class="sunset-container">
                <span>Sunset</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-sunset" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 0 1 8 0" />
                <line x1="3" y1="21" x2="21" y2="21" />
                <path d="M12 3v6l3 -3m-6 0l3 3" />
                </svg>
            </div>
            <div class="sunset">${sunset}<div>
        </div>
    </div>
    `
}

const fillDailyTempSection = (obj) => {
    //let {temp, day, icon, type} = obj;
    const otherTemp = d.querySelector('.other-temp');
    otherTemp.innerHTML = null;
    const fragment = d.createDocumentFragment();
    obj.forEach(el => {
        const article = d.createElement('article');
        article.classList.add('card');
        article.innerHTML = `
            <h3 class="day">${el.day}</h3>
            <div class="icon"><img src="http://openweathermap.org/img/wn/${el.icon}@2x.png"></div>
            <h3 class="main-temp"><span class="temp">${el.temp}</span>${el.type}</h3>
        `;
        fragment.appendChild(article);
    })
    otherTemp.appendChild(fragment);
}

const renderApp = (obj, city, country) => {
    const actualTempData = formatActualData(obj, city, country);
    fillActualTempSection(actualTempData);

    const clockData = formatClockData(obj);
    fillClockSection(clockData);
    

    const dailyTempData = formatDailyData(obj.daily);
    fillDailyTempSection(dailyTempData);

    tempFill = true;
}

export {loader, fillActualTempSection, fillClockSection, fillDailyTempSection, renderApp, tempFill}
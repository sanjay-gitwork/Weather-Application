// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}


// KEY - c8d5908ddb6bdbadbd9232dd75563ce7
//API KEY - https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
    key: "c8d5908ddb6bdbadbd9232dd75563ce7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const searchInputBox = document.getElementById('input-box');

searchInputBox.addEventListener('keypress', (event) => {

	  if(event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }
});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}

// show weather report

function showWeatherReport(weather){
	console.log(weather);

	let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let humidity = document.getElementById('humidity');
    humidity.innerHTML = `${Math.floor(weather.main.humidity)} `;

    let pressure = document.getElementById('pressure');
    pressure.innerHTML = `${Math.floor(weather.main.pressure)} `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let weatherDescriptionType = document.getElementById('description');
    weatherDescriptionType.innerText = `${weather.weather[0].description}`;


    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('images/clear.jpg')";
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('images/cloud.jpg')";
        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('images/rain.jpg')";
        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
        
    } 
}



// Date manage
function dateManage(dateArg) {
	let days = ["Sunday", "Monday", "Tuesday", 
				"Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", 
    			  "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}

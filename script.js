const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const APIkey = 'ff70be1787e7006b3d7ccb5f0268b362'
let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${APIkey}&units=metric`

document.addEventListener('DOMContentLoaded',()=>{
	if(localStorage.getItem("City")!=null){
		input.value=localStorage.getItem("City")
		getWeather()
	}
})

async function getWeather() {
	localStorage.setItem("City",input.value)
	try {
		API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${APIkey}&units=metric`
		const res = await fetch(API_URL)
		const data = await res.json()
		setData(data)
		setImg(data)
		input.value = null
		warning.textContent = null
	} catch {
		warning.textContent = 'Wpisz poprawną nazwę miasta!'
	}
}

const setData = data => {
	weather.textContent = data.weather[0].description

	temperature.textContent = Math.floor(data.main.temp) + '°C'

	humidity.textContent = data.main.humidity + '%'

	cityName.textContent = data.name
}

const setImg = data => {
	const id = data.weather[0].id
	console.log(data.weather[0].id)
	let icon
	if (id >= 200 && id <= 232) {
		icon = 'thunderstorm'
	} else if (id >= 300 && id <= 321) {
		icon = 'drizzle'
	} else if (id >= 500 && id <= 531) {
		icon = 'rain'
	} else if ((id >= 600) & (id <= 622)) {
		icon = 'snow'
	} else if (id == 741) {
		icon = 'fog'
	} else if (id == 800) {
		icon = 'sun'
	} else if (id >= 801 && id <= 804) {
		icon = 'cloud'
	} else {
		icon = 'unknown'
	}
	photo.setAttribute('src', './img/' + icon + '.png')
}

button.addEventListener('click', getWeather)
input.addEventListener('keydown', event => {
	if (event.key == 'Enter') {
		getWeather()
	}
})

window.addEventListener("load", () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let imgIcon = document.getElementById("icon");
	let temperatureSection = document.querySelector(".temperature");
	let temperatureSpan = document.querySelector(".temperature span");

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(async (position) => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			// Fetch weather
			const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=e822515d9d70fb424286ce57415f7b3c`;
			const response = await fetch(api);
			const data = await response.json();
            console.log(data);
			// Set elements
			temperatureDegree.textContent = data.main.temp;
			temperatureDescription.textContent = data.weather[0].description.toUpperCase();
			locationTimezone.textContent = data.name;
			imgIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

			// Formula for conversion
			let fahrenheit = data.main.temp * (9 / 5) + 32;

			// Change temp units
			temperatureSection.addEventListener("click", () => {
				if (temperatureSpan.textContent === "C") {
					temperatureSpan.textContent = "F";
					temperatureDegree.textContent = Math.floor(fahrenheit);
				} else {
					temperatureSpan.textContent = "C";
					temperatureDegree.textContent = Math.floor(data.main.temp);
				}
			});
		});
	}
});
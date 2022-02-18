window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long  = position.coords.longitude;
            lat = position.coords.latitude;


            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e822515d9d70fb424286ce57415f7b3c
            `

            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const {temp} = data.main;
                const {0: {description}} = data.weather;
                const {name} = data;
                const icon =  data.weather[0].icon;
                //Set DOM Elements from the API
                
                temperatureDescription.textContent = description.toUpperCase();;
                locationTimezone.textContent = name;
                document.getElementById('image-box').src ='http://openweathermap.org/img/wn/' + icon + '@2x.png';

               
                // Change Temperature to Celsius/Farenheit
                let celsius = (temp - 273.15);
                let Farenheit = ((temp - 273.15) * (9/5) + 32) ;
                    temperatureSection.addEventListener('click', () => {
                        if(temperatureSpan.textContent === "C"){
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = Math.floor(Farenheit);
                        }
                        else{
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }
                    })


            })
        });

       
    }
    // const icon = wInfo.weather[0].icon; // For instance "09d"
    // <Image source={{ uri: ``http://openweathermap.org/img/w/${icon}.png`` }} />

   
});
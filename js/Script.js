// -------------Real Time
let TimeTag = document.querySelector('.RealTime')

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + amPm;
  return strTime;
}
TimeTag.innerHTML = formatAMPM(new Date)
// ----------------------All Doms
let CityName = document.querySelector('.CityName')
let Country = document.querySelector('.Country')
let SearchCity = document.querySelector('.searchInput')
let SearchButton = document.querySelector('.searchButton')
let InputError = document.querySelector('.error')
// --------Weather temp Doms
let Celsius = document.querySelector ('.temp')
let wind    = document.querySelector('.Wind_meter')
let Humidity = document.querySelector('.humidity_meter')
let Description = document.querySelector('.Description')
let CountryFlag = document.querySelector('.flags')
let Clouds      = document.querySelector('.Clouds_meter')
let FeelsLike   = document.querySelector('.feels_meter')
let AirPressure = document.querySelector('.Pressure_meter')
let Visibility  = document.querySelector('.Visibility_meter')
let WindSpeed   = document.querySelector('.Speed_meter')
let WeatherCond = document.querySelector('.Weather_conditions')
// -------------------Weather Api And Function
SearchButton.addEventListener('click', ()=>{
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${SearchCity.value}&limit=1&appid=1ac18e0799f399b251467e0738d3aab3`)
    .then(res => res.json())
    .then((Data) => {
      try{

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Data[0].lat}&lon=${Data[0].lon}&appid=1ac18e0799f399b251467e0738d3aab3`)
        .then(res => res.json())
        .then((WeatherData) =>{
          CityName.innerHTML = WeatherData.name
          Country.innerHTML = WeatherData.sys.country
          // -----------Kelvin Convert
          let num = WeatherData.main.temp -  273.15
          let formattedNum = num.toFixed(0)
          let feels = WeatherData.main.feels_like -273.15
          let FCelsius = feels.toFixed(0)
          let NotVisible = WeatherData.visibility / 1000
  
          // --------Weather temp Doms
          Celsius.innerHTML = formattedNum //Weather Celsius
          wind.innerHTML = WeatherData.wind.speed //Weather Wind Speed
          let PercentHumidity = WeatherData.main.humidity //Weather Humidity
          Humidity.innerHTML = `${PercentHumidity}%` //Weather Humidity
          Description.innerHTML = WeatherData.weather[0].description //Weather Description
          CountryFlag.setAttribute('src' , `https://flagsapi.com/${WeatherData.sys.country}/flat/64.png`)
          Clouds.innerHTML = WeatherData.clouds.all //Bottom Clouds count
          FeelsLike.innerHTML = FCelsius //Feels Like
          AirPressure.innerHTML = WeatherData.main.pressure //wind pressure
          Visibility.innerHTML = NotVisible //Visibility
          WindSpeed.innerHTML = WeatherData.wind.speed //Wind Speed
          WeatherCond.setAttribute('src' , `https://openweathermap.org/img/wn/${WeatherData.weather[0].icon}@2x.png`)
          console.log(WeatherData) 
        })
      }
      catch(err){
    InputError.style.display = 'flex';
    InputError.style.opacity = '0';
    InputError.style.transform = 'translateX(100px)';
    InputError.style.transition = 'transform 0.4s ease-out, opacity 0.4s ease-out';

    requestAnimationFrame(() => {
      InputError.style.opacity = '1';
      InputError.style.transform = 'translateX(0)';
    });
    setTimeout(() => {
      InputError.style.opacity = '0';
      InputError.style.transform = 'translateX(100px)';
      setTimeout(() => {
        InputError.style.display = 'none';
      }, 400);
    }, 3000);
      }
  
      // console.log(Data[0].lon)
    })
})
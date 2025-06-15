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
// --------Weather temp Doms
let Celsius = document.querySelector ('.temp')

// -------------------Weather Api And Function
SearchButton.addEventListener('click', ()=>{
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${SearchCity.value}&limit=1&appid=1ac18e0799f399b251467e0738d3aab3`)
    .then(res => res.json())
  
    .then((Data) => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${Data[0].lat}&lon=${Data[0].lon}&appid=1ac18e0799f399b251467e0738d3aab3`)
      .then(res => res.json())
      .then((WeatherData) =>{
        CityName.innerHTML = WeatherData.name
        Country.innerHTML = WeatherData.sys.country

        // --------Weather temp Doms
        let num = WeatherData.main.temp -  273.15 //kelvin covert
        let formattedNum = num.toFixed(0) //kelvin covert
        
        Celsius.innerHTML = formattedNum
        console.log(WeatherData.main.temp)
      })
  
  
      // console.log(Data[0].lon)
    })
})
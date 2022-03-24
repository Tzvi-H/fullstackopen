const Weather = ({ capital, weather }) => {
  if (!weather.weather) {
    return <></>
  }
  
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>temperature {weather.main.temp} Celcius</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon'/>
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  )  
}

export default Weather;
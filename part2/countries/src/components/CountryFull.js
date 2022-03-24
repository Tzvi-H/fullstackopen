import Weather from './Weather'
import { useState, useEffect } from 'react';
import axios from 'axios';
const WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY

const CountryFull = ({ country }) => {
  const [ weather, setWeather ] = useState({});

  useEffect(() => {
    const lat = country.capitalInfo.latlng[0]
    const long = country.capitalInfo.latlng[1]
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${WEATHER_API_KEY}`)
      .then(({ data }) => setWeather(data));
  }, [country])

  return (
    <div>
      <h1>{country.name.common}</h1>

      <div>
        capital {country.capital} <br/>
        area {country.area}
      </div>
      
      <div>
        <h3>languages</h3>
        <ul>
          {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
        </ul>
      </div>

      <img src={country.flags.png} alt={`flag of ${country.name.common}`}/>
      
      <Weather capital={country.capital} weather={weather} />
    </div>
  )
}

export default CountryFull;
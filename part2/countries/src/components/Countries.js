import CountryFull from './CountryFull';
import CountryBasic from './CountryBasic';

const Countries = ({ countries }) => {
  if (countries.length > 10) {
    return (
      <p>Too many countries, specify another filter</p>
    )
  } else if (countries.length === 1) {
    return (
      <CountryFull country={countries[0]} />
    )
  } else if (countries.length > 1) {
    return (
      <div>
        {
          countries.map(country => (
            <CountryBasic key={country.name.common} country={country} />
          ))
        }
      </div>
    )
  } else {
    return <p>No countries matched</p>
  }
}

export default Countries;
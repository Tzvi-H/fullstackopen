const CountryFull = ({ country }) => (
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
  </div>
)

export default CountryFull;
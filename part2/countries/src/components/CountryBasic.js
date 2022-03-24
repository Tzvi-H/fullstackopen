const CountryBasic = ({ country, setCountryFilter }) => {
  const updateCountryFilter = event => {
    setCountryFilter(event.target.id);
  }
  
  return (
    <p>
      {country.name.common}
      <button onClick={updateCountryFilter} id={country.name.common}>show</button>
    </p>
)}

export default CountryBasic;
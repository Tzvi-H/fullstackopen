import axios from 'axios';
import { useState, useEffect } from 'react';
import Countries from './components/Countries';

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ countryFilter, setCountryFilter ] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(({ data }) => setCountries(data));
  }, [])

  const handleCountryChange = event => {
    setCountryFilter(event.target.value);
  }

  const countriesToShow = countries.filter(country => {
    return country.name.common.toLowerCase().includes(countryFilter.toLowerCase());
  })

  return (
    <div>
      find countries <input value={countryFilter} onChange={handleCountryChange}/>

      <Countries countries={countriesToShow} setCountryFilter={setCountryFilter}/>
    </div>
  );
}

export default App;

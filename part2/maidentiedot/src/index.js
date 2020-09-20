import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FilterCountries from './components/filter-countries';
import Countries from './components/countries';
import Weather from './components/weather';

const App = () => {

  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  const handleFilterChange = event => void setFilter(event.target.value); 

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
      setCountries(response.data);
    })
  }, [setCountries])

  const filterCountries = (filter, countries) =>
    countries.filter(country => 
      country.name.toLowerCase().includes(filter.toLowerCase()));

  return(
    <div>
      <FilterCountries 
      filter={filter}
      handleFilterChange = {handleFilterChange}></FilterCountries>

      <Countries countries={filterCountries(filter, countries)} show={setFilter}></Countries>
      {filterCountries(filter, countries).length === 1 && <Weather country={filterCountries(filter, countries)[0]}></Weather>}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));

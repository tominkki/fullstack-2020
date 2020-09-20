import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FilterCountries from './components/filter-countries.js';
import Countries from './components/countries.js'

const App = () => {

  const [countries, setCountries] = useState([]);
  const [filter, setNewFilter] = useState('');

  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value);
  } 

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
      setCountries(response.data);
    })
  }, [setCountries])

  function filterCountries (filter, countries) {
    const countriesToShow = countries.filter(country => {
      if(country.name.toLowerCase().includes(filter.toLowerCase())) {
        return country;
      }
    });

    return countriesToShow;
  }

  return(
    <div>
      <FilterCountries
      filter = {filter}
      handleFilterChange = {handleFilterChange}></FilterCountries>

      <Countries countries={filterCountries(filter, countries)} show={setNewFilter}></Countries>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
import React from 'react';

const Country = ({country}) =>(
<>
<h2>{country.name}</h2>
<p>Capital: {country.capital}</p>
<p>Population: {country.population}</p>
<h3>Languages</h3>
{country.languages.map(language =>(
    <li key={language.name}>{language.name}</li>
))}
<img src = {country.flag} alt='flag' width = '150'/>
</>
);

export default Country;
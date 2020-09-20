import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Weather = ({country}) => {

    const appid = process.env.REACT_APP_API_KEY;

    const [weather, setWeather] = useState(null);

    useEffect(() => {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${appid}`)
          .then(response => {
              setWeather(response.data);
        })
    }, [country.capital, appid, setWeather]);

    if(!weather) {
        return null;
    }

    return(
        <>
        <h3>Weather in {weather.name}</h3>
        <p><b>Temperature: </b> {weather.main.temp} celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='icon'/>
        <p><b>Wind: </b> {weather.wind.speed} m/s direction {weather.wind.deg} degrees</p>
        </>
    );
}

export default Weather;

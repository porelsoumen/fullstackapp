import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = (props) => {
    const weather = props.weather.current
    console.log(weather, weather)
    return (
        <div>
            <div><strong>temperature: </strong> {weather && weather.temperature} Celsius</div>
            <img src={weather && weather.weather_icons[0]}></img>
            <div><strong>wind: </strong> {weather && weather.wind_speed} mph direction {weather && weather.wind_dir}</div>
        </div>
    )
}

const Country = (props) => {
    const [weather, setWeather] = useState({})

    const country = props.country

    useEffect(() => {
        const promise = axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)

        promise.then(response => {
            const weatherData = response.data
            //console.log('weatherData', weatherData)
            setWeather(weatherData)
        }, error => {
            console.log(error)
        }
        )
    }, [country.capital])

    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>Spoken languages</h3>
            <ul>
            {country.languages.map(lang => {
            return (
                <li key={lang.name}>{lang.name}</li>
            )
            })}</ul>
            <img src={country.flag}></img>
            <h3>Weather in {country.capital}</h3>
            <Weather weather={weather} />
        </div>  
    )
}

export default Country
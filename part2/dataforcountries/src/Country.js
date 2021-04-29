import React from 'react'

const Country = (props) => {
    const country = props.country
    return (
        <div>
            <h2>{country.name}</h2>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h3>languages</h3>
            <ul>
            {country.languages.map(lang => {
            return (
                <li key={lang.name}>{lang.name}</li>
            )
            })}</ul>
            <img src={country.flag}></img>
        </div>  
    )
}

export default Country
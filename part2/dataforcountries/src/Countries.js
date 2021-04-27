import React from 'react'

const Countries = (props) => {
    if (props.matches.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    } else if (props.matches.length === 1) {
        const country = props.matches[0]
        const langs = country.languages
        return (
            <div>
                <h2>{country.name}</h2>
                <div>capital {country.capital}</div>
                <div>population {country.population}</div>
                <h3>languages</h3>
                <ul>
                    {langs.map(lang => {
                        return (
                            <li>{lang.name}</li>
                        )
                })}</ul>
                <img src={country.flag}></img>
            </div>
        )
    }
    else {
      return (
        props.matches.map(country => {
            return (
            <div key={country.name}>{country.name}</div>
            ) 
        })
      )
    }
  }

  export default Countries
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  useEffect(() => {
    const promise = axios.get('https://restcountries.eu/rest/v2/all')

    promise.then(response => {
      const countryData = response.data
      setCountries(countryData)
    })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const matches = countries.filter(country => {
    return (
      country.name.toLowerCase().includes(filter)
    )
  })

  return (
    <div>
      <p>find countries<input value={filter} onChange={handleFilterChange}></input></p>
      <Countries matches={matches} />
    </div>
  )
}

export default App

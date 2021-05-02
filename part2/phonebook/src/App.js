import React, { useState, useEffect } from 'react'
import Search from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './personService'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    
    const newPerson = {
      name: newName,
      number: newNumber
    }

    var idx = persons.findIndex(person => person.name === newPerson.name)

    if (idx !== -1) {
      alert(`${newName} already added to the phonebook`)
    }else {
      personService.create(newPerson)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      }) 
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchTerm(event.target.value)
  }

  const matches = persons.filter(person => {
    return (
      person.name.toLowerCase().includes(searchTerm)
    )
  })

  useEffect(() => {
    personService.getAll('http://localhost:3001/persons')
    .then(responseData => {
      setPersons(responseData)
    })
  }, [persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <Search value={searchTerm} onChange={handleSearchChange}/>
      <h3>add a new</h3>
      <PersonForm addNewPerson={addNewPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons matches={matches} />
    </div>
  )
}

export default App
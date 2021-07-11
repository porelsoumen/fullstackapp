import React, { useState, useEffect } from 'react'
import Search from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import personService from './personService'
import Notification from './Notification'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ successMessage, setSuccessMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  const addNewPerson = (event) => {
    event.preventDefault()
    
    const newPerson = {
      name: newName,
      number: newNumber
    }

    var idx = persons.findIndex(person => person.name === newPerson.name)

    if (idx !== -1) {
      //alert(`${newName} already added to the phonebook`)
      if (newNumber !== persons[idx].number) {
        const ans = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)
        if (ans) {
          const response = personService.update(persons[idx].id, newPerson)
          response.catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from the server`)
            setTimeout(() => setErrorMessage(null), 5000)
          })
      }
    }
  }else {
      personService.create(newPerson)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(newPerson))
        setSuccessMessage(`${newName} added successfully`)
        setTimeout(() => setSuccessMessage(null), 5000)
      })
    }
    setNewName('')
    setNewNumber('')
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
    personService.getAll()
    .then(responseData => {
      setPersons(responseData)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      {successMessage ? <Notification message={successMessage} state={'success'}/> : ''}
      {errorMessage ? <Notification message={errorMessage} state={'failure'}/> : ''}
      <Search value={searchTerm} onChange={handleSearchChange}/>
      <h3>add a new</h3>
      <PersonForm addNewPerson={addNewPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons matches={matches} />
    </div>
  )
}

export default App
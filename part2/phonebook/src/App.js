import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    
    const newPerson = {
      name: newName
    }

    var idx = persons.findIndex(person => person.name === newPerson.name)

    if (idx !== -1) {
      alert(`${newName} already added to the phonebook`)
    }else {
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
        <div>
          name: <input value={newName} onChange={handleChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      {persons.map(person => {
        return (    
        <p key={person.name}>{person.name}</p>
        )     
      })}
    </div>
  )
}

export default App
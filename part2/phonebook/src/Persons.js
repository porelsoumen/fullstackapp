import React, { useState } from 'react'
import Person from './Person'
import personService from './personService'

const Persons = (props) => {

    return (
        props.matches.map(person => {
            return (
                <div>
                <Person key={person.id} name={person.name} number={person.number} />
                <button onClick={() => { window.confirm(`Delete ${person.name}`) 
                personService.remove(person.id)}}>delete</button>
                </div>
            )
        })
    )
}

export default Persons
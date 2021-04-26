import React from 'react'
import Person from './Person'

const Persons = (props) => {
    return (
        props.matches.map(person => {
            return (
                <Person key={person.name} name={person.name} number={person.number} />
            )
        })
    )
}

export default Persons
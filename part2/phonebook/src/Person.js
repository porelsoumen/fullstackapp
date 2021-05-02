import React from 'react'

const Person = (props) => {
    return (
        <div>
            <p>{props.name} {props.number}</p>
        </div>
    )
}

export default Person
import React from 'react'

const Notification = (props) => {
    if ( props.message === null)
        return null
    
    return (
        <div className={props.state}>
            {props.message}
        </div>
    )
}

export default Notification
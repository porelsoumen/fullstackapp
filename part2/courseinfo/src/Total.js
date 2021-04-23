import React from 'react'

const Total = (props) => {
	
	return (
		<div>
		<p>Total of {props.parts.reduce((accumulator, currentItem) => accumulator + currentItem.exercises,0)} exercises</p>
		</div>
	)
}

export default Total

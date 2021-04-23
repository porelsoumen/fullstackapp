import React from 'react'

const Total = (props) => {
	
	return (
		<div>
		<p><strong>Total of {props.parts.reduce((accumulator, currentItem) => accumulator + currentItem.exercises,0)} exercises</strong></p>
		</div>
	)
}

export default Total

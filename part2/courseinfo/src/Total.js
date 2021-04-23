import React from 'react'

const Total = (props) => {
	let sum = 0;
	props.parts.map(part => sum += part.exercises)
	return (
		<div>
		<p>Total of {sum} exercises</p>
		</div>
	)
}

export default Total

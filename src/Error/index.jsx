import React from 'react'

import './style.css'

const ErrorMessage = ({ error }) => {
	return (
		<div className="ErrorMessage">
			<small> {error.toString()} </small>
		</div>
	)
}

export default ErrorMessage

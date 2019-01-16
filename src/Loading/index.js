import React from 'react'
import LoadingGif from './loading.gif'

const Loading = () => {
	return (
		<div>
			<img
				src={LoadingGif}
				alt="loading"
				style={{
					width: '150px',
				}}
			/>{' '}
		</div>
	)
}

export default Loading

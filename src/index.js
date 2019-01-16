import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import './style.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

const GITHUB_BASE_URL = 'https://api.github.com/graphql'

const httpLink = new HttpLink({
	uri: GITHUB_BASE_URL,
	headers: {
		authorization: `Bearer ${
			process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
		}`,
	},
})

const cache = new InMemoryCache() //place where the data is managed in Apollo Client

const errorLink = onError(({ graphQLErrors, networkError }) => {
	if (graphQLErrors) {
		// do something with graphql error
		graphQLErrors.map(({ message, locations, path }) =>
			console.log(
				`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
			),
		)
	}

	if (networkError) {
		// do something with network error
		console.log(`[Network error]: ${networkError}`)
	}
})

const link = ApolloLink.from([errorLink, httpLink])

const client = new ApolloClient({
	link,
	cache,
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { BrowserRouter, Route } from 'react-router-dom'
import reducer from './reducers'
import App from './containers/App'
import Header from './components/header/Header';
import EnterTableValues from './components/createTable/EnterTableValues'
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
	middleware.push(createLogger())
}

const store = createStore(
	reducer,
	applyMiddleware(...middleware)
)

render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Route exact path='/' component={Header} />
				<Route exact path='/' component={App} />
				<Route path='/enterTableValues' component={Header} />
				<Route path='/enterTableValues' component={EnterTableValues} />
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)
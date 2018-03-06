import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { BrowserRouter, Route } from 'react-router-dom'
import reducer from './reducers'
import App from './containers/App'
import ScrollToTop from './containers/ScrollToTop'
import Header from './components/header/Header';
import CreateTable from './components/createTable/CreateTable'
import EnterFieldInfo from './components/createTable/EnterFieldInfo'
import EnterTableValues from './components/createTable/EnterTableValues'
import UpdateTable from './components/updateTable/UpdateTable'
import './index.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table.min.css'
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
		<BrowserRouter basename={process.env.PUBLIC_URL}>
		<ScrollToTop>
			<div>
				<Route exact path='/' component={Header} />
				<Route exact path='/' component={App} />
				<Route path='/createTable' component={Header} />
				<Route path='/createTable' component={CreateTable} />
				<Route path='/enterFieldsInfo' component={Header} />
				<Route path='/enterFieldsInfo' component={EnterFieldInfo} />
				<Route path='/enterTableValues' component={Header} />
				<Route path='/enterTableValues' component={EnterTableValues} />
				<Route path='/updateTable' component={Header} />
				<Route path='/updateTable' component={UpdateTable} />
			</div>
		</ScrollToTop>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)

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
import CreateTableModal from './components/createTable/CreateTableModal'
import EnterFieldInfoModal from './components/createTable/EnterFieldInfoModal'
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
		<ScrollToTop>
			<div>
				<Route exact path={process.env.PUBLIC_URL + '/'} component={Header} />
				<Route exact path={process.env.PUBLIC_URL + '/'} component={App} />
				<Route exact path={process.env.PUBLIC_URL + '/createTable'} component={Header} />
				<Route path={process.env.PUBLIC_URL + '/createTable'} component={CreateTableModal} />
				<Route exact path={process.env.PUBLIC_URL + '/enterFieldsInfo'} component={Header} />
				<Route path={process.env.PUBLIC_URL + '/enterFieldsInfo'} component={EnterFieldInfoModal} />
				<Route exact path={process.env.PUBLIC_URL + '/enterTableValues'} component={Header} />
				<Route path={process.env.PUBLIC_URL + '/enterTableValues'} component={EnterTableValues} />
			</div>
		</ScrollToTop>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
)

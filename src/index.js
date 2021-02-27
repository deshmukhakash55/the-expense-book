import './firebase.config';

import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import App from './App';
import { authReducer } from './store/reducers/auth';
import authSaga from './store/actions/sagas/authSagas';
import { expenseReducer } from './store/reducers/expense';
import expenseSaga from './store/actions/sagas/expenseSagas';
import { networkReducer } from './store/reducers/network';
import reportWebVitals from './reportWebVitals';
import { watchAuthStatus } from './firebase.config';
import { watchNetworkStatus } from './network.config';

import './index.css';

const reducers = combineReducers({
	auth: authReducer,
	expense: expenseReducer,
	network: networkReducer
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(authSaga);
sagaMiddleware.run(expenseSaga);

watchNetworkStatus(store);
watchAuthStatus(store);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

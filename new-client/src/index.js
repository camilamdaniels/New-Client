import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignIn from './components/signin';
import SignOut from './components/signout';
import SignUp from './components/signup';
import Users from './components/users';
import RequireAuth from './components/hoc/RequireAuth';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import reducers from './reducers';
import './index.css';
import { USER_AUTHENTICATED } from './actions';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
const clientStore = createStoreWithMiddleware(reducers);
const token = window.localStorage.getItem('token');
if (token) {
	clientStore.dispatch({ type: USER_AUTHENTICATED });
}

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<Provider store={clientStore}>
			<Router>
				<div>
					<Route path="/" component={App}/>
					<Route path="/users" component={RequireAuth(Users)}/>
					<Route path="/signin" component={SignIn}/>
					<Route path="/signout" component={SignOut}/>
					<Route path="/signup" component={SignUp}/>
				</div>
			</Router>
		</Provider>
	</Provider>, 
	document.getElementById('root'));

import axios from 'axios';

axios.defaults.withCredentials = true;
const ROOT_URL = 'http://localhost:3001';

export const USER_REGISTERED = 'USER_REGISTERED';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const USER_UNAUTHENTICATED = 'USER_UNAUTHENTICATED';
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const GET_USERS = 'GET_USERS';
export const CHECK_IF_AUTHENTICATED = 'CHECK_IF_AUTHENTICATED';

export const authError = error => {
	return {
		type: AUTHENTICATION_ERROR,
		payload: error
	};
};

export const register = (email, password, history) => {
	return dispatch => {
		axios
			.post(`${ROOT_URL}/api/users`, { email, password })
			.then(response => {
				window.localStorage.setItem('token', response.data.token);
				dispatch({
					type: USER_REGISTERED
				});
				history.push('/signin');
			})
			.catch(() => {
				dispatch(authError('Failed to register user'));
			});
	};
};

export const login = (email, password, history) => {
	return dispatch => {
		axios
			.post(`${ROOT_URL}/api/login`, { email, password })
			.then(response => {
				window.localStorage.setItem('token', response.data.token);
				dispatch({
					type: USER_AUTHENTICATED
				});
				history.push('/api/users');
			})
			.catch(() => {
				dispatch(authError('Incorrect email/ password combo'));
			});
	};
};

export const logout = history => {
	return dispatch => {
		dispatch({
			type: USER_UNAUTHENTICATED
		});
		window.localStorage.removeItem('token');
	};
};

export const getUsers = () => {
	return dispatch => {
		const token = window.localStorage.getItem('token');
		axios
			.get(`${ROOT_URL}/api/users`, {
				headers: { 'Authorization': token }
			})
			.then(response => {
				dispatch({
					type: GET_USERS,
					payload: response.data
				});
			})
			.catch(() => {
				dispatch(authError('Failed to fetch users'));
			});
	};
};
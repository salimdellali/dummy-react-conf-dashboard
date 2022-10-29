import axios from 'axios';
import { SERVER_URL } from '../App';
import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	// REGISTER_SUCCESS,
	// REGISTER_FAIL,
} from './types';
import { returnErrors } from './errorActions';

// Helper function
import { notify } from './helperFunctions';

// Check token and load user
export const loadUser = () => (dispatch, getState) => {
	// getState is a redux function used to get part of redux state
	// User loading
	dispatch({ type: USER_LOADING });

	axios
		.get(SERVER_URL + '/api/auth/user', tokenConfig(getState)) // tokenConfig is a function declared at the end of the file
		.then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data, // res.data should be an object with the user and the token itself
			})
		)
		.catch((err) => {
			// dispatch(returnErrors()) returns an object just like the dispatch bellow
			dispatch(
				returnErrors(
					err.response.data, // 1st argument : msg : err.response.data
					err.response.status // 2n argument : status : err.response.status
				)
			);
			dispatch({
				type: AUTH_ERROR,
			});
		});
};

// Login User
export const login =
	({ email, password }) =>
	(dispatch) => {
		// Headers
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		//Request body
		const body = JSON.stringify({ email, password });

		axios
			.post(SERVER_URL + '/api/auth', body, config)
			.then((res) => {
				notify(`Logged in as ${res.data.user.name}`, 'info', dispatch);
				dispatch({
					type: LOGIN_SUCCESS,
					payload: res.data,
				});
			})
			.catch((err) => {
				notify(
					`Something went wrong! (${err.response.data})`,
					'error',
					dispatch
				);
				dispatch(
					returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL')
				);
				dispatch({
					type: LOGIN_FAIL,
				});
			});
	};

// Logout User
export const logout = () => (dispatch) => {
	notify(`Logged out Succcesfully!`, 'info', dispatch);
	dispatch({
		type: LOGOUT_SUCCESS,
	});
};

// Setup config/headers and token
export const tokenConfig = (getState) => {
	// Get token from localStorage
	/**
	 * getState() is used to access the redux whole state
	 *  .auth means we use the authReducer state
	 *  .token means we want to get the token value from authReducer's state
	 */
	const token = getState().auth.token;

	// Headers
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};

	// If token, add to header
	if (token) {
		config.headers['x-auth-token'] = token;
	}

	return config;
};

/**
 * any error we get, we want to run it through our errorReducer
 */
import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
	return {
		type: GET_ERRORS,
		// payload: {
		// 	msg: msg,
		// 	status: status,
		// 	id: id,
		// },
		// Same as below
		payload: { msg, status, id },
	};
};

// CLEAR ERRORS
export const clearErrors = () => {
	return {
		type: CLEAR_ERRORS,
	};
};

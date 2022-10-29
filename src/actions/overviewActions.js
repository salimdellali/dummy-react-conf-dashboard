import { GET_OVERVIEW } from './types';
import axios from 'axios';
import { returnErrors } from './errorActions';

// Helper function
import { notify } from './helperFunctions';

export const getOverview = () => (dispatch) => {
	axios
		.get('/api/overview')
		.then((res) => {
			notify(`Overview data fetched Succesfully!`, 'success', dispatch);
			dispatch({
				type: GET_OVERVIEW,
				payload: res.data,
			});
		})
		.catch((err) => {
			notify(`Something went wrong! (${err.response.data})`, 'error', dispatch);
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

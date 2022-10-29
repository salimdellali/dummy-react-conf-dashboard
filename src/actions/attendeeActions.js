import axios from 'axios';
import {
	GET_ATTENDEES,
	ADD_ATTENDEE,
	UPDATE_ATTENDEE,
	DELETE_ATTENDEE,
	ATTENDEES_LOADING,
} from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

// Helper function
import { notify } from './helperFunctions';

export const getAttendees = () => (dispatch) => {
	dispatch(setAttendeesLoading());
	axios
		.get('/api/attendees')
		.then((res) => {
			dispatch({
				type: GET_ATTENDEES,
				payload: res.data,
			});
		})
		.catch((err) => {
			notify(`Something went wrong! (${err.response.data})`, 'error', dispatch);
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const addAttendee = (newAttendee) => (dispatch) => {
	axios
		.post('/api/attendees', newAttendee)
		.then((res) => {
			dispatch({
				type: ADD_ATTENDEE,
				payload: res.data,
			});
			notify(
				`Attendee ${res.data.fullName} Added Successfully`,
				'success',
				dispatch
			);
		})
		.catch((err) => {
			notify(`Something went wrong! (${err.response.data})`, 'error', dispatch);
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const updateAttendee = (updatedAttendee) => (dispatch, getState) => {
	axios
		.put('/api/attendees', updatedAttendee, tokenConfig(getState))
		.then((res) => {
			notify(
				`Attendee ${res.data.fullName} Updated Successfully`,
				'success',
				dispatch
			);
			dispatch({
				type: UPDATE_ATTENDEE,
				payload: updatedAttendee,
			});
		})
		.catch((err) => {
			notify(`Something went wrong! (${err.response.data})`, 'error', dispatch);
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const deleteAttendee = (id) => (dispatch, getState) => {
	axios
		.delete(`api/attendees/${id}`, tokenConfig(getState))
		.then((res) => {
			notify(
				`Attendee ${res.data.fullName} Deleted Successfully`,
				'success',
				dispatch
			);
			dispatch({
				type: DELETE_ATTENDEE,
				payload: id,
			});
		})
		.catch((err) => {
			notify(`Something went wrong! (${err.response.data})`, 'error', dispatch);
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

export const setAttendeesLoading = () => {
	return {
		type: ATTENDEES_LOADING,
	};
};

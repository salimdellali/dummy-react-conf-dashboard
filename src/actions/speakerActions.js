import {
	GET_SPEAKERS,
	// ADD_SPEAKER,
	DELETE_SPEAKER,
	// SPEAKERS_LOADING
} from './types';

export const getSpeakers = () => {
	return {
		type: GET_SPEAKERS,
	};
};

export const deleteSpeaker = (id) => {
	return {
		type: DELETE_SPEAKER,
		payload: id,
	};
};

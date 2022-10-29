import { GET_OVERVIEW } from '../actions/types';

const initialState = {
	conferenceInformation: {
		dates: [],
		title: '',
		shortDescription: '',
		longDescription: '',
		startTime: '1970-01-01T00:00:00.000Z',
	},
	numberOfSpeakers: 0,
	numberOfAttendees: 0,
	numberOfSessions: 0,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_OVERVIEW:
			return action.payload;
		// return {
		// 	...state,
		// 	overview: action.payload,
		// };
		default:
			return state;
	}
}

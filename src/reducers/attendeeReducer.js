import {
	GET_ATTENDEES,
	ADD_ATTENDEE,
	DELETE_ATTENDEE,
	UPDATE_ATTENDEE,
	ATTENDEES_LOADING,
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export

const initialState = {
	attendees: [],
	loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_ATTENDEES:
			return {
				...state,
				attendees: action.payload,
				loading: false,
			};

		case ADD_ATTENDEE:
			return {
				...state,
				attendees: [...state.attendees, action.payload],
			};

		case UPDATE_ATTENDEE:
			const IndexRelatedAttendee = state.attendees.findIndex(
				(attendee) => attendee._id === action.payload._id
			);

			// Deepclone of state into newState (important !!!)
			const newState = JSON.parse(JSON.stringify(state));

			newState.attendees[IndexRelatedAttendee] = action.payload;

			return newState;

		case DELETE_ATTENDEE:
			return {
				...state,
				attendees: state.attendees.filter(
					(attendee) => attendee._id !== action.payload
				),
			};

		case ATTENDEES_LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}

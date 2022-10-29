import {
	GET_SCHEDULES,
	// ADD_SCHEDULE,
	DELETE_SCHEDULE,
	// SCHEDULES_LOADING,
	DELETE_SESSION,
} from '../actions/types';

const initialState = {
	schedules: [
		{
			_id: 1,
			description: 'Day 1 · December 20',
			sessions: [
				{
					_id: 1,
					time: '7:00am',
					name: 'Arrivals',
					description: 'Waiting for attendees to arrive to the conference.',
					speakers: [],
				},
				{
					_id: 2,
					time: '7:30am',
					name: 'Breakfast & Networking',
					description: 'Enjoy a tasty breakfast with your fellow attendees.',
					speakers: [],
				},
				{
					_id: 3,
					time: '8:30am',
					name: 'Keynote',
					description:
						'A keynote in public speaking is a talk that establishes a main underlying theme. ... At political or industrial conventions and expositions and at academic conferences, the keynote address or keynote speech is delivered to set the underlying tone and summarize the core message or most important revelation of the event.',
					speakers: ['Mathys Garcia', 'Erica Schmitt'],
				},
				{
					_id: 4,
					time: '9:00am',
					name: 'Building the New Facebook with React, GraphQL and Relay',
					description:
						"Open source projects like React, GraphQL and Relay are powering more and more Facebook services. In this session, we'll discuss how we use the latest features of these technologies, like React Suspense, to help deliver a high quality, modern web experience at Facebook.",
					speakers: ['Erica Schmitt'],
				},
				{
					_id: 5,
					time: '10:00am',
					name: 'Snack Break & Networking',
					description:
						'Get yourself your favorite Snack with your fellow attendees.',
					speakers: [],
				},
			],
		},
		{
			_id: 2,
			description: 'Day 2 · December 21',
			sessions: [
				{
					_id: 1,
					time: '7:00am',
					name: 'Arrivals',
					description: 'Waiting for attendees to arrive to the conference.',
					speakers: [],
				},
				{
					_id: 2,
					time: '7:30am',
					name: 'Breakfast & Networking',
					description: 'Enjoy a tasty breakfast with your fellow attendees.',
					speakers: [],
				},
				{
					_id: 3,
					time: '8:30am',
					name: 'React Developer Tooling',
					description:
						'React is an incredible framework for frontend development. It also facilitates mobile app development for multiple platforms. React was a game-changer for mobile app development services across the world, and developers were thrilled when Facebook announced its launch. This post explores the features of React developer tools.',
					speakers: ['Ernâni da Cunha'],
				},
				{
					_id: 4,
					time: '9:00am',
					name: 'Data Fetching With Suspense In Relay',
					description:
						"Suspense is not a data fetching library. It's a mechanism for data fetching libraries to communicate to React that the data a component is reading is not ready yet. React can then wait for it to be ready and update the UI. At Facebook, we use Relay and its new Suspense integration.",
					speakers: ['Hayley Thompson'],
				},
				{
					_id: 5,
					time: '10:00am',
					name: 'Snack Break & Networking',
					description:
						'Get yourself your favorite Snack with your fellow attendees.',
					speakers: [],
				},
			],
		},
	],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_SCHEDULES:
			return {
				...state,
			};
		case DELETE_SCHEDULE:
			return {
				...state,
				schedules: state.schedules.filter(
					(schedule) => schedule._id !== action.payload
				),
			};
		case DELETE_SESSION:
			const relatedSchedule = state.schedules.find(
				(schedule) => schedule._id === action.payload.scheduleId
			);
			const IndexRelatedSchedule = state.schedules.findIndex(
				(schedule) => schedule._id === action.payload.scheduleId
			);
			const newSessionsWithoutHadikSession = relatedSchedule.sessions.filter(
				(session) => session._id !== action.payload.sessionId
			);
			// Deepclone of state into newState (important !!!)
			const newState = JSON.parse(JSON.stringify(state));
			/*
			const newState = { ...state } 
			// doesn't work because it's not a full copy (it's a shallow copy)
			*/
			newState.schedules[
				IndexRelatedSchedule
			].sessions = newSessionsWithoutHadikSession;
			return newState;
		default:
			return state;
	}
}

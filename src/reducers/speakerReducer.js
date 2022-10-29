import {
	GET_SPEAKERS,
	// ADD_SPEAKER,
	DELETE_SPEAKER,
	// SPEAKERS_LOADING
} from '../actions/types';

const initialState = {
	speakers: [
		{
			_id: 1,
			gender: 'male',
			name: {
				title: 'Mr',
				first: 'Mathys',
				last: 'Garcia',
			},
			profession: 'Developer at Reactjs',
			email: 'mathys.garcia@example.com',
			phone: '04-15-67-26-78',
			cell: '06-03-35-73-28',
			picture: {
				large: 'https://randomuser.me/api/portraits/men/95.jpg',
				medium: 'https://randomuser.me/api/portraits/med/men/95.jpg',
				thumbnail: 'https://randomuser.me/api/portraits/thumb/men/95.jpg',
			},
			nat: 'FR',
		},
		{
			_id: 2,
			gender: 'female',
			name: {
				title: 'Madame',
				first: 'Erica',
				last: 'Schmitt',
			},
			profession: 'GraphQL and Relay Expert',
			email: 'erica.schmitt@example.com',
			phone: '075 523 09 98',
			cell: '076 641 43 11',
			picture: {
				large: 'https://randomuser.me/api/portraits/women/18.jpg',
				medium: 'https://randomuser.me/api/portraits/med/women/18.jpg',
				thumbnail: 'https://randomuser.me/api/portraits/thumb/women/18.jpg',
			},
			nat: 'CH',
		},
		{
			_id: 3,
			gender: 'male',
			name: {
				title: 'Mr',
				first: 'Eddie',
				last: 'Cunningham',
			},
			profession: 'React Tooling Expert',
			email: 'eddie.cunningham@example.com',
			phone: '(92) 8630-2922',
			cell: '(21) 4253-1476',
			picture: {
				large: 'https://randomuser.me/api/portraits/men/86.jpg',
				medium: 'https://randomuser.me/api/portraits/med/men/86.jpg',
				thumbnail: 'https://randomuser.me/api/portraits/thumb/men/86.jpg',
			},
			nat: 'BR',
		},
		{
			_id: 4,
			gender: 'female',
			name: {
				title: 'Ms',
				first: 'Hayley',
				last: 'Thompson',
			},
			profession: 'Data Scientist',
			email: 'hayley.thompson@example.com',
			phone: '(558)-674-4220',
			cell: '(935)-069-8928',
			picture: {
				large: 'https://randomuser.me/api/portraits/women/66.jpg',
				medium: 'https://randomuser.me/api/portraits/med/women/66.jpg',
				thumbnail: 'https://randomuser.me/api/portraits/thumb/women/66.jpg',
			},
			nat: 'NZ',
		},
	],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_SPEAKERS:
			return {
				...state,
			};
		case DELETE_SPEAKER:
			return {
				...state,
				speakers: state.speakers.filter(
					(speaker) => speaker._id !== action.payload
				),
			};
		default:
			return state;
	}
}

/**
 * The main point of this rootReducer is just to bring together all of our other reducers
 */
import { combineReducers } from 'redux';

import overviewReducer from './overviewReducer';

import attendeeReducer from './attendeeReducer';
import speakerReducer from './speakerReducer';
import scheduleReducer from './scheduleReducer';

import notifierReducer from './notifierReducer';

import authReducer from './authReducer';
import errorReducer from './errorReducer';

export default combineReducers({
	overview: overviewReducer,
	attendee: attendeeReducer,
	speaker: speakerReducer,
	schedule: scheduleReducer,
	notifier: notifierReducer,
	auth: authReducer,
	error: errorReducer,
});

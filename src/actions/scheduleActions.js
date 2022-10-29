import {
	GET_SCHEDULES,
	// ADD_SCHEDULE,
	DELETE_SCHEDULE,
	// SCHEDULES_LOADING,
	DELETE_SESSION,
} from './types';

export const getSchedules = () => {
	return {
		type: GET_SCHEDULES,
	};
};

export const deleteSchedule = (id) => {
	return {
		type: DELETE_SCHEDULE,
		payload: id,
	};
};

export const deleteSession = (scheduleId, sessionId) => {
	return {
		type: DELETE_SESSION,
		payload: {
			scheduleId,
			sessionId,
		},
	};
};

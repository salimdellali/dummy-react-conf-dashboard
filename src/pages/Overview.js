import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { getOverview } from '../actions/overviewActions';
import PropTypes from 'prop-types';

import { Grid, Card, CardContent, Typography, Box } from '@material-ui/core';
import {
	RecordVoiceOver as RecordVoiceOverIcon,
	Schedule as ScheduleIcon,
	People as PeopleIcon,
	Note as NoteIcon,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	cardIcon: {
		fontSize: 100,
	},
}));

function Overview(props) {
	const classes = useStyles();
	const { overview } = props;

	useEffect(() => {
		props.getOverview();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [timerDays, setTimerDays] = useState(0);
	const [timerHours, setTimerHours] = useState(0);
	const [timerMinutes, setTimerMinutes] = useState(0);
	const [timerSeconds, setTimerSeconds] = useState(0);
	const [timerExpired, setTimerExpired] = useState(false);

	let interval = useRef();

	const startTimer = () => {
		// const countDownDate = new Date('Dec 21, 2021 08:30:00').getTime();
		const countDownDate = new Date(
			overview.conferenceInformation.startTime
		).getTime();
		// const countDownDate = startTime.getTime();

		// Update the count down every 1 second
		interval = setInterval(() => {
			// Get today's date and time
			const now = new Date().getTime();

			// Find the distance between now and the count down date
			const distance = countDownDate - now;

			const days = Math.floor(distance / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((distance % (1000 * 60)) / 1000);

			// check if the count down is finished
			if (distance < 0) {
				// Stop our timer
				setTimerExpired(true);
				clearInterval(interval.current);
			} else {
				// Update our timer
				setTimerDays(days);
				setTimerHours(hours);
				setTimerMinutes(minutes);
				setTimerSeconds(seconds);
			}
		}, 1000);
	};

	if (overview.conferenceInformation.startTime !== '1970-01-01T00:00:00.000Z')
		startTimer();

	// ComponentDidMount
	useEffect(() => {
		return () => {
			// eslint-disable-next-line react-hooks/exhaustive-deps
			clearInterval(interval.current);
		};
	});

	return (
		<>
			<h1>OVERVIEW</h1>
			<Grid container spacing={3}>
				<Grid item xs={3}>
					<Card>
						<Box display="flex">
							<Box m="auto">
								<CardContent align="center">
									<Typography gutterBottom>
										<ScheduleIcon className={classes.cardIcon} />
									</Typography>
									<Typography variant="h4" gutterBottom>
										Time Left
									</Typography>
									<Typography variant="h6">
										{timerExpired
											? 'HAPPENING NOW!'
											: `${timerDays}d :: ${timerHours}h :: ${timerMinutes}m :: ${timerSeconds}s`}
									</Typography>
								</CardContent>
							</Box>
						</Box>
					</Card>
				</Grid>
				<Grid item xs={3}>
					<Card>
						<Box display="flex">
							<Box m="auto">
								<CardContent align="center">
									<Typography gutterBottom>
										<RecordVoiceOverIcon className={classes.cardIcon} />
									</Typography>
									<Typography variant="h4" gutterBottom>
										Speakers
									</Typography>
									<Typography variant="h5">
										{overview.numberOfSpeakers}
									</Typography>
								</CardContent>
							</Box>
						</Box>
					</Card>
				</Grid>
				<Grid item xs={3}>
					<Card>
						<Box display="flex">
							<Box m="auto">
								<CardContent align="center">
									<Typography gutterBottom>
										<NoteIcon className={classes.cardIcon} />
									</Typography>
									<Typography variant="h4" gutterBottom>
										Sessions
									</Typography>
									<Typography variant="h5">
										{overview.numberOfSessions}
									</Typography>
								</CardContent>
							</Box>
						</Box>
					</Card>
				</Grid>
				<Grid item xs={3}>
					<Card>
						<Box display="flex">
							<Box m="auto">
								<CardContent align="center">
									<Typography gutterBottom>
										<PeopleIcon className={classes.cardIcon} />
									</Typography>
									<Typography variant="h4" gutterBottom>
										Attendees
									</Typography>
									<Typography variant="h5">
										{overview.numberOfAttendees}
									</Typography>
								</CardContent>
							</Box>
						</Box>
					</Card>
				</Grid>
			</Grid>
		</>
	);
}

Overview.propTypes = {
	getOverview: PropTypes.func.isRequired,
	overview: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	overview: state.overview,
});

export default connect(mapStateToProps, { getOverview })(Overview);

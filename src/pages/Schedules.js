import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { useConfirm } from 'material-ui-confirm';

import {
	getSchedules,
	deleteSchedule,
	deleteSession,
} from '../actions/scheduleActions';
import {
	enqueueSnackbar as enqueueSnackbarAction,
	closeSnackbar as closeSnackbarAction,
} from '../actions/notifierActions';

import PropTypes from 'prop-types';

/**
 * MATERIAL UI IMPORTS
 */
import {
	// Table related
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	// Accordion
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Typography,
	Button,
	IconButton,
	Grid,
	Tooltip,
	LinearProgress,
} from '@material-ui/core';

// MUI Icons
import {
	ExpandMore as ExpandMoreIcon,
	AddCircle as AddCircleIcon,
	Edit as EditIcon,
	Delete as DeleteIcon,
	Close as CloseIcon,
} from '@material-ui/icons';

// MATERIAL UI CUSTOM STYLING
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		'&:nth-of-type(odd)': {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	headingIcons: {
		marginLeft: 'auto',
	},
	button: {
		margin: theme.spacing(1),
	},
	table: {
		minWidth: 650,
	},
}));

function Schedules(props) {
	const classes = useStyles();
	const confirm = useConfirm();
	const { schedules } = props.schedule;
	const [isLoading, setIsLoading] = useState(true);

	// notifier related
	const dispatch = useDispatch();
	const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
	const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

	useEffect(() => {
		props.getSchedules();
		setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleDeleteSchedule = (id, description) => {
		// Prompt to confirm deletion
		confirm({
			description: `Permanently delete day: ${description}`,
		})
			// Deletion accepted
			.then(() => props.deleteSchedule(id))
			//notifier deletion success
			.then(() => {
				enqueueSnackbar({
					message: `Schedule [ID:${id}] ${description} Deleted Successfully`,
					options: {
						key: new Date().getTime() + Math.random(),
						variant: 'success',
						action: (key) => (
							<IconButton
								aria-label="closeNotification"
								onClick={() => closeSnackbar(key)}
							>
								<CloseIcon />
							</IconButton>
						),
					},
				});
			})
			// notifier deletion canceled
			.catch(() => {
				enqueueSnackbar({
					message: `Deletion Schedule [ID:${id}] ${description} Canceled`,
					options: {
						key: new Date().getTime() + Math.random(),
						variant: 'info',
						action: (key) => (
							<IconButton
								aria-label="closeNotification"
								onClick={() => closeSnackbar(key)}
							>
								<CloseIcon />
							</IconButton>
						),
					},
				});
			});
	};

	const handleDeleteSession = (scheduleId, sessionId, name, time) => {
		// Prompt to confirm deletion
		confirm({
			description: `Permanently delete session ${time} : ${name}`,
		})
			// Deletion accepted
			.then(() => props.deleteSession(scheduleId, sessionId))
			//notifier deletion success
			.then(() => {
				enqueueSnackbar({
					message: `Session [ID:${sessionId}] ${time} - ${name} Deleted Successfully`,
					options: {
						key: new Date().getTime() + Math.random(),
						variant: 'success',
						action: (key) => (
							<IconButton
								aria-label="closeNotification"
								onClick={() => closeSnackbar(key)}
							>
								<CloseIcon />
							</IconButton>
						),
					},
				});
			})
			// notifier deletion canceled
			.catch(() => {
				enqueueSnackbar({
					message: `DeletionSession [ID:${sessionId}] ${time} - ${name} Canceled`,
					options: {
						key: new Date().getTime() + Math.random(),
						variant: 'info',
						action: (key) => (
							<IconButton
								aria-label="closeNotification"
								onClick={() => closeSnackbar(key)}
							>
								<CloseIcon />
							</IconButton>
						),
					},
				});
			});
	};

	const makeTable = (scheduleId, sessions) => {
		return (
			<Grid container>
				<Grid item xs={3}>
					<Button
						variant="contained"
						color="primary"
						className={classes.button}
						disabled={props.userName !== 'admin' ? true : false}
						startIcon={<AddCircleIcon />}
					>
						Add New Session
					</Button>
				</Grid>
				<Grid item xs={12}>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableHead>
								<StyledTableRow>
									<StyledTableCell>Manage</StyledTableCell>
									<StyledTableCell>ID</StyledTableCell>
									<StyledTableCell>Time</StyledTableCell>
									<StyledTableCell>Name</StyledTableCell>
									<StyledTableCell>Description</StyledTableCell>
									<StyledTableCell>Speakers</StyledTableCell>
								</StyledTableRow>
							</TableHead>
							<TableBody>
								{sessions.map((session) => (
									<StyledTableRow key={session._id}>
										<StyledTableCell>
											<Tooltip title="Edit" placement="left-end">
												<IconButton
													disabled={props.userName !== 'admin' ? true : false}
													aria-label="edit"
												>
													<EditIcon />
												</IconButton>
											</Tooltip>
											<Tooltip title="Delete" placement="left-end">
												<IconButton
													aria-label="delete"
													disabled={props.userName !== 'admin' ? true : false}
													onClick={() =>
														handleDeleteSession(
															scheduleId,
															session._id,
															session.name,
															session.time
														)
													}
												>
													<DeleteIcon />
												</IconButton>
											</Tooltip>
										</StyledTableCell>
										<StyledTableCell>{session._id}</StyledTableCell>
										<StyledTableCell>{session.time}</StyledTableCell>
										<StyledTableCell>
											<b>{session.name}</b>
										</StyledTableCell>
										<StyledTableCell>{session.description}</StyledTableCell>
										<StyledTableCell>
											{session.speakers.toString()}
										</StyledTableCell>
									</StyledTableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		);
	};

	return (
		<>
			<h1>SCHEDULES</h1>
			<Button
				variant="contained"
				color="primary"
				disabled={props.userName !== 'admin' ? true : false}
				className={classes.button}
				startIcon={<AddCircleIcon />}
			>
				Add New Day
			</Button>
			{isLoading ? (
				<LinearProgress />
			) : (
				<div className={classes.root}>
					{schedules.map((schedule) => (
						<Accordion key={schedule._id}>
							<AccordionSummary
								expandIcon={<ExpandMoreIcon />}
								aria-controls="panel1a-content"
								id="panel1a-header"
							>
								<Typography className={classes.heading}>
									{`[ID:${schedule._id}] ${schedule.description}`}
								</Typography>
								<Typography className={classes.headingIcons}>
									<Tooltip title="Edit" placement="left-end">
										<IconButton
											disabled={props.userName !== 'admin' ? true : false}
											onClick={(event) => {
												event.stopPropagation();
											}}
											onFocus={(event) => event.stopPropagation()}
											size="small"
											aria-label="edit"
										>
											<EditIcon fontSize="inherit" />
										</IconButton>
									</Tooltip>
									<Tooltip title="Delete" placement="left-end">
										<IconButton
											disabled={props.userName !== 'admin' ? true : false}
											onClick={(event) => {
												event.stopPropagation();
												handleDeleteSchedule(
													schedule._id,
													schedule.description
												);
											}}
											onFocus={(event) => event.stopPropagation()}
											size="small"
											aria-label="delete"
										>
											<DeleteIcon fontSize="inherit" />
										</IconButton>
									</Tooltip>
								</Typography>
							</AccordionSummary>
							<AccordionDetails>
								{makeTable(schedule._id, schedule.sessions)}
							</AccordionDetails>
						</Accordion>
					))}
				</div>
			)}
		</>
	);
}

Schedules.propTypes = {
	getSchedules: PropTypes.func.isRequired,
	deleteSchedule: PropTypes.func.isRequired,
	deleteSession: PropTypes.func.isRequired,
	schedule: PropTypes.object.isRequired,
	userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	schedule: state.schedule,
	userName: state.auth.user.name,
});

export default connect(mapStateToProps, {
	getSchedules,
	deleteSchedule,
	deleteSession,
})(Schedules);

import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';

import { useConfirm } from 'material-ui-confirm';

import { getSpeakers, deleteSpeaker } from '../actions/speakerActions';
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
	// Other
	Avatar,
	Paper,
	IconButton,
	Button,
	Tooltip,
	LinearProgress,
} from '@material-ui/core';

import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	AddCircle as AddCircleIcon,
	Close as CloseIcon,
} from '@material-ui/icons';

import { makeStyles, withStyles } from '@material-ui/core/styles';

// MATERIAL UI CUSTOM STYLING
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
	table: {
		minWidth: 650,
	},
	button: {
		margin: theme.spacing(1),
	},
}));

function Speakers(props) {
	const classes = useStyles();
	const confirm = useConfirm();
	const { speakers } = props.speaker;
	const [isLoading, setIsLoading] = useState(true);

	// notifier related
	const dispatch = useDispatch();
	const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
	const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

	useEffect(() => {
		props.getSpeakers();
		setIsLoading(false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleDeleteSpeaker = (id, firstName, lastName, email) => {
		// Prompt to confirm deletion
		confirm({
			description: `Permanently delete speaker: ${firstName} ${lastName} (${email}).`,
		})
			// Deletion accepted
			.then(() => props.deleteSpeaker(id))
			//notifier deletion success
			.then(() => {
				enqueueSnackbar({
					message: `Speaker ${firstName} ${lastName} Deleted Successfully`,
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
					message: `Deletion Speaker ${firstName} ${lastName} Canceled`,
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

	return (
		<>
			<h1>SPEAKERS</h1>
			<Button
				variant="contained"
				color="primary"
				className={classes.button}
				startIcon={<AddCircleIcon />}
				disabled={props.userName !== 'admin' ? true : false}
			>
				Add New Speaker
			</Button>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Manage</StyledTableCell>
							<StyledTableCell>ID</StyledTableCell>
							<StyledTableCell>Picture</StyledTableCell>
							<StyledTableCell>Title</StyledTableCell>
							<StyledTableCell>First Name</StyledTableCell>
							<StyledTableCell>Last Name</StyledTableCell>
							<StyledTableCell>Profession</StyledTableCell>
							<StyledTableCell>Email</StyledTableCell>
							<StyledTableCell>Phone</StyledTableCell>
							<StyledTableCell>Cell</StyledTableCell>
							<StyledTableCell>Gender</StyledTableCell>
							<StyledTableCell>Nationality</StyledTableCell>
						</TableRow>
					</TableHead>
					{isLoading ? null : (
						<TableBody>
							{speakers.map((speaker) => (
								<StyledTableRow key={speaker._id}>
									<StyledTableCell>
										<Tooltip title="Edit" placement="left-end">
											<IconButton
												aria-label="edit"
												disabled={props.userName !== 'admin' ? true : false}
											>
												<EditIcon />
											</IconButton>
										</Tooltip>
										<Tooltip title="Delete" placement="left-end">
											<IconButton
												aria-label="delete"
												disabled={props.userName !== 'admin' ? true : false}
												onClick={() =>
													handleDeleteSpeaker(
														speaker._id,
														speaker.name.first,
														speaker.name.last,
														speaker.email
													)
												}
											>
												<DeleteIcon />
											</IconButton>
										</Tooltip>
									</StyledTableCell>
									<StyledTableCell>{speaker._id}</StyledTableCell>
									<StyledTableCell>
										<Avatar
											alt={`${speaker.name.first} ${speaker.name.last}`}
											src={speaker.picture.large}
										/>
									</StyledTableCell>
									<StyledTableCell>{speaker.name.title}</StyledTableCell>
									<StyledTableCell>
										<b>{speaker.name.first}</b>
									</StyledTableCell>
									<StyledTableCell>
										<b>{speaker.name.last}</b>
									</StyledTableCell>
									<StyledTableCell>
										<b>{speaker.profession}</b>
									</StyledTableCell>
									<StyledTableCell>{speaker.email}</StyledTableCell>
									<StyledTableCell>{speaker.phone}</StyledTableCell>
									<StyledTableCell>{speaker.cell}</StyledTableCell>
									<StyledTableCell>{speaker.gender}</StyledTableCell>
									<StyledTableCell>{speaker.nat}</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					)}
				</Table>
				{isLoading ? <LinearProgress /> : null}
			</TableContainer>
		</>
	);
}

Speakers.propTypes = {
	getSpeakers: PropTypes.func.isRequired,
	deleteSpeaker: PropTypes.func.isRequired,
	speaker: PropTypes.object.isRequired,
	userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
	speaker: state.speaker,
	userName: state.auth.user.name,
});

export default connect(mapStateToProps, { getSpeakers, deleteSpeaker })(
	Speakers
);

import React from 'react';
import { connect } from 'react-redux';
import { updateAttendee } from '../actions/attendeeActions';
import { Formik, Form, Field } from 'formik';
import { TextField, RadioGroup } from 'formik-material-ui';

import PropTypes from 'prop-types';

// Material UI
import {
	// Dialog related
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	// Form related
	Radio,
	FormControlLabel,
	FormLabel,
	// Other
	Button,
	Box,
	Grid,
	LinearProgress,
	IconButton,
} from '@material-ui/core';

// Material UI Icons
import { Edit as EditIcon, People as PeopleIcon } from '@material-ui/icons';

// Material UI Styles
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
	button: {
		margin: theme.spacing(1),
	},
}));

function UpdateAttendeeDialog(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<IconButton
				aria-label="edit"
				onClick={handleClickOpen}
				disabled={props.userName !== 'admin' ? true : false}
			>
				<EditIcon />
			</IconButton>
			<Dialog
				open={open}
				keepMounted
				onClose={handleClose}
				maxWidth={'md'}
				scroll="body"
				aria-labelledby="alert-dialog-slide-title"
				aria-describedby="alert-dialog-slide-description"
			>
				<Formik
					initialValues={{
						_id: props.theAttendee._id,
						email: props.theAttendee.email,
						fullName: props.theAttendee.fullName,
						picture: props.theAttendee.picture,
						breakfast: props.theAttendee.foodOptions.breakfast,
						snacks: props.theAttendee.foodOptions.snacks,
						lunch: props.theAttendee.foodOptions.lunch,
						dinner: props.theAttendee.foodOptions.dinner,
					}}
					validate={(values) => {
						const errors = {};
						if (!values.email) {
							errors.email = 'Required';
						} else if (
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
						) {
							errors.email = 'Invalid email address';
						} else if (!values.fullName) {
							errors.fullName = 'Required';
						} else if (!values.picture) {
							errors.picture = 'Required';
						}
						return errors;
					}}
					onSubmit={(values, { setSubmitting, resetForm }) => {
						setSubmitting(false);
						const updatedAttendee = {
							_id: values._id,
							email: values.email,
							fullName: values.fullName,
							picture: values.picture,
							foodOptions: {
								breakfast: values.breakfast,
								snacks: values.snacks,
								lunch: values.lunch,
								dinner: values.dinner,
							},
						};
						// Add attendee via addAttendee action
						props.updateAttendee(updatedAttendee);

						handleClose();
						// resetForm();
					}}
				>
					{({ submitForm, isSubmitting, handleReset }) => (
						<Form>
							<DialogTitle id="alert-dialog-slide-title">
								<Grid container direction="row" alignItems="center">
									<PeopleIcon /> &nbsp; Update Attendee
								</Grid>
							</DialogTitle>
							<DialogContent>
								<DialogContentText variant="h6">
									Basic Information
								</DialogContentText>

								{/* id */}
								<Box mb={1} mt={-1}>
									<Field
										component={TextField}
										name="_id"
										type="text"
										label="Id"
										fullWidth={true}
										disabled
									/>
								</Box>

								{/* Email */}
								<Box mb={1} mt={-1}>
									<Field
										component={TextField}
										name="email"
										type="email"
										label="Email"
										fullWidth={true}
									/>
								</Box>

								{/* Full Name */}
								<Box mb={1}>
									<Field
										component={TextField}
										name="fullName"
										type="text"
										label="Full Name"
										fullWidth={true}
									/>
								</Box>

								{/* Picture*/}
								<Box mb={3}>
									<Field
										component={TextField}
										name="picture"
										type="text"
										label="Picture"
										fullWidth={true}
									/>
								</Box>

								{/* Food Options */}
								<DialogContentText variant="h6">Food Options</DialogContentText>

								<Grid container spacing={3}>
									{/* Breakfast */}
									<Grid item xs>
										<FormLabel component="legend">Breakfast</FormLabel>
										<Field component={RadioGroup} name="breakfast">
											<FormControlLabel
												value="Classic"
												control={
													<Radio color="primary" disabled={isSubmitting} />
												}
												label="Classic"
												disabled={isSubmitting}
											/>
											<FormControlLabel
												value="English"
												control={
													<Radio color="primary" disabled={isSubmitting} />
												}
												label="English"
												disabled={isSubmitting}
											/>
											<FormControlLabel
												value="No Preference"
												control={
													<Radio color="primary" disabled={isSubmitting} />
												}
												label="No Preference"
											/>
										</Field>
									</Grid>

									{/* Snacks */}
									<Grid item xs>
										<FormLabel component="legend">Snacks</FormLabel>
										<Field component={RadioGroup} name="snacks">
											<FormControlLabel
												value="Healthy"
												control={
													<Radio color="primary" disabled={isSubmitting} />
												}
												label="Healthy"
												disabled={isSubmitting}
											/>
											<FormControlLabel
												value="Regular"
												control={
													<Radio color="primary" disabled={isSubmitting} />
												}
												label="Regular"
												disabled={isSubmitting}
											/>
											<FormControlLabel
												value="No Preference"
												control={
													<Radio color="primary" disabled={isSubmitting} />
												}
												label="No Preference"
											/>
										</Field>
									</Grid>

									{/* Lunch */}
									<Grid item xs>
										<FormLabel component="legend">Lunch</FormLabel>
										<Field component={RadioGroup} name="lunch">
											<FormControlLabel
												value="Healthy"
												control={
													<Radio color="primary" disabled={isSubmitting} />
												}
												label="Healthy"
												disabled={isSubmitting}
											/>
											<FormControlLabel
												value="Fast Food"
												control={
													<Radio color="primary" disabled={isSubmitting} />
												}
												label="Fast Food"
												disabled={isSubmitting}
											/>
											<FormControlLabel
												value="No Preference"
												control={
													<Radio color="primary" disabled={isSubmitting} />
												}
												label="No Preference"
											/>
										</Field>
									</Grid>

									{/* Dinner */}
									<Grid item xs>
										<FormLabel component="legend">Dinner</FormLabel>
										<Field component={RadioGroup} name="dinner">
											<FormControlLabel
												value="Healthy"
												control={
													<Radio color="primary" disabled={isSubmitting} />
												}
												label="Healthy"
												disabled={isSubmitting}
											/>
											<FormControlLabel
												value="Fast Food"
												control={
													<Radio color="primary" disabled={isSubmitting} />
												}
												label="Fast Food"
												disabled={isSubmitting}
											/>
											<FormControlLabel
												value="No Preference"
												control={
													<Radio color="primary" disabled={isSubmitting} />
												}
												label="No Preference"
											/>
										</Field>
									</Grid>
								</Grid>

								<Box mb={1}>{isSubmitting && <LinearProgress />}</Box>
							</DialogContent>
							<DialogActions>
								<Button disabled={isSubmitting} onClick={handleClose}>
									Cancel
								</Button>
								<Button
									variant="contained"
									onClick={handleReset}
									disabled={isSubmitting}
								>
									Reset to default values
								</Button>
								<Button
									variant="contained"
									color="primary"
									className={classes.button}
									disabled={isSubmitting}
									onClick={submitForm}
								>
									Submit
								</Button>
							</DialogActions>
						</Form>
					)}
				</Formik>
			</Dialog>
		</>
	);
}

UpdateAttendeeDialog.propTypes = {
	updateAttendee: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	attendee: state.attendee,
});

export default connect(mapStateToProps, { updateAttendee })(
	UpdateAttendeeDialog
);

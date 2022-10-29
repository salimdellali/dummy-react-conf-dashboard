import logo from './logo.svg';

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from './actions/authActions';
import { clearErrors } from './actions/errorActions';

import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';

// Material UI
import {
	// Other
	Button,
	Box,
	Container,
	LinearProgress,
} from '@material-ui/core';

function Login(props) {
	return (
		<Container maxWidth="sm">
			{/** ADMIN FROM */}
			<Formik
				initialValues={{
					email: '',
					password: '',
				}}
				validate={(values) => {
					const errors = {};
					if (!values.email) {
						errors.email = 'Required';
					} else if (!values.password) {
						errors.password = 'Required';
					}
					return errors;
				}}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(false);

					const user = {
						email: values.email,
						password: values.password,
					};

					// Attempt to login
					props.login(user);
					// resetForm();
				}}
			>
				{({ submitForm, isSubmitting, handleReset }) => (
					<Form>
						<div align="center">
							<img src={logo} className="App-logo" alt="logo" />
							<h1>React Conf 2021 Dashboard</h1>
						</div>
						{isSubmitting && (
							<Box mb={1}>
								<LinearProgress />
							</Box>
						)}
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
								name="password"
								type="password"
								label="Password"
								fullWidth={true}
							/>
						</Box>

						<Box mb={5}>
							<Button
								variant="contained"
								disabled={isSubmitting}
								onClick={submitForm}
								fullWidth={true}
							>
								Login
							</Button>
						</Box>
					</Form>
				)}
			</Formik>

			{/** READ ONLY ADMIN FROM */}
			<Formik
				initialValues={{
					email: 'readonlyadmin@dummyreactconf.com',
					password: 'roadummyreactconf',
				}}
				onSubmit={(values, { setSubmitting, resetForm }) => {
					setSubmitting(false);

					const user = {
						email: values.email,
						password: values.password,
					};

					// Attempt to login
					props.login(user);
					resetForm();
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form>
						<Box mb={-2}>
							<div align="center">
								<h5>OR</h5>
							</div>
						</Box>
						<Box mb={1}>
							<Button
								variant="contained"
								color="primary"
								disabled={isSubmitting}
								onClick={submitForm}
								fullWidth={true}
							>
								Login as Read Only Admin
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</Container>
	);
}

Login.propTypes = {
	isAuthenticated: PropTypes.bool,
	error: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired,
	clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(Login);

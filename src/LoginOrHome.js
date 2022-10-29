import React from 'react';
import Home from './Home';
import Login from './Login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function LoginOrHome(props) {
	return (
		<>
			{props.auth.isAuthenticated ? (
				<Home userName={props.auth.user.name} />
			) : (
				<Login />
			)}
		</>
	);
}

LoginOrHome.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, null)(LoginOrHome);

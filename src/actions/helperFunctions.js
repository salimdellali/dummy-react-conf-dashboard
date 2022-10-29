import {
	enqueueSnackbar as enqueueSnackbarAction,
	closeSnackbar as closeSnackbarAction,
} from '../actions/notifierActions';

// MUI Imports
import { IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

export const notify = (message, variant, dispatch) => {
	// notifier related
	const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
	const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

	enqueueSnackbar({
		message,
		options: {
			key: new Date().getTime() + Math.random(),
			variant,
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
};

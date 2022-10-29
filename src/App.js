import { useEffect } from 'react';
// import Home from './Home';
// import Login from './Login';
import LoginOrHome from './LoginOrHome';
import { Provider } from 'react-redux';
import { ConfirmProvider } from 'material-ui-confirm';
import { SnackbarProvider } from 'notistack';
import store from './store';
import { loadUser } from './actions/authActions';

import Notifier from './components/Notifier';

function App() {
	// To make sure the loadUser action executes every time, we put it inside componenetDidMount in App.js
	useEffect(() => {
		store.dispatch(loadUser()); // since we have access to the store at line 7, we can access .dispatch() the loadUser action
	}, []);

	return (
		<Provider store={store}>
			<ConfirmProvider>
				<SnackbarProvider>
					<Notifier />
					<div className="App">
						<LoginOrHome />
					</div>
				</SnackbarProvider>
			</ConfirmProvider>
		</Provider>
	);
}

export default App;

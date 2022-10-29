import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

// pages imports
import Overview from './pages/Overview';
import Speakers from './pages/Speakers';
import Schedules from './pages/Schedules';
import Attendees from './pages/Attendees';

import Logout from './components/auth/Logout';

// Material UI imports
import {
	// navbar imports
	AppBar,
	Toolbar,
	IconButton,
	Hidden,
	// sidebar imports
	Drawer,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	// Other imports
	CssBaseline,
	Typography,
	Chip,
	Box,
} from '@material-ui/core';

// MUI icons imports
import {
	Menu as MenuIcon,
	Dashboard as DashboardIcon,
	RecordVoiceOver as RecordVoiceOverIcon,
	Note as NoteIcon,
	People as PeopleIcon,
} from '@material-ui/icons';

// MUI styling imports
import { makeStyles, useTheme } from '@material-ui/core/styles';

/**
 * MUI STYLING CONFIG
 */
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	link: {
		textDecoration: 'none',
		color: theme.palette.text.primary,
	},
	title: {
		flexGrow: 1,
	},
}));

function Home(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	// the sidebar Listitems
	const drawer = (
		<>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				<Link to="/" className={classes.link}>
					<ListItem button>
						<ListItemIcon>
							<DashboardIcon />
						</ListItemIcon>
						<ListItemText primary={'Overview'} />
					</ListItem>
				</Link>
				<Divider />
				<Link to="/speakers" className={classes.link}>
					<ListItem button>
						<ListItemIcon>
							<RecordVoiceOverIcon />
						</ListItemIcon>
						<ListItemText primary={'Speakers'} />
					</ListItem>
				</Link>
				<Link to="/schedules" className={classes.link}>
					<ListItem button>
						<ListItemIcon>
							<NoteIcon />
						</ListItemIcon>
						<ListItemText primary={'Schedules'} />
					</ListItem>
				</Link>
				<Link to="/attendees" className={classes.link}>
					<ListItem button>
						<ListItemIcon>
							<PeopleIcon />
						</ListItemIcon>
						<ListItemText primary={'Attendees'} />
					</ListItem>
				</Link>
			</List>
		</>
	);

	return (
		<Router>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar position="fixed" className={classes.appBar}>
					<Toolbar>
						<IconButton
							color="inherit"
							aria-label="open drawer"
							edge="start"
							onClick={handleDrawerToggle}
							className={classes.menuButton}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" noWrap className={classes.title}>
							Dashboard React Conf 2021{' '}
							{props.userName !== 'admin'
								? '(Add, Edit and Delete features are disabled)'
								: ''}
						</Typography>
						<Box mr={1}>
							<span>Logged in as</span>
						</Box>
						<Box mr={1}>
							<Chip
								// variant="outlined"
								size="small"
								label={props.userName}
							/>
						</Box>
						{/* <Button variant="contained" startIcon={<MeetingRoomIcon />}>
							Logout
						</Button> */}
						<Logout />
					</Toolbar>
				</AppBar>
				<nav className={classes.drawer} aria-label="mailbox folders">
					<Hidden smUp implementation="css">
						<Drawer
							// container={container}
							variant="temporary"
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={mobileOpen}
							onClose={handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper,
							}}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							{drawer}
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Drawer
							classes={{
								paper: classes.drawerPaper,
							}}
							variant="permanent"
							open
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
				<main className={classes.content}>
					<div className={classes.toolbar} />
					<Switch>
						<Route exact path="/" component={Overview} />
						<Route exact path="/speakers" component={Speakers} />
						<Route exact path="/schedules" component={Schedules} />
						<Route exact path="/attendees" component={Attendees} />
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default Home;

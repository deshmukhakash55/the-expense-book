import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import {
	CssNavbarCircularProgress,
	CssPostAddIcon,
	CssCollectionsBookmarkIcon,
	CssExitToAppIcon,
	DrawerCssPostAddIcon,
	DrawerCssCollectionsBookmarkIcon,
	DrawerCssExitToAppIcon,
	CssDrawer,
	CssMenuIcon
} from '../../utility/widgets';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Logo from '../../assets/logo.png';

import * as actions from '../../store/actions/auth';

import classes from './Navbar.module.css';

const Navbar = (props) => {
	const [drawerOpen, setDrawerOpen] = useState(false);
	useEffect(() => {
		if (!props.isLoggedIn && props.checkingLoginDone) {
			props.history.push('/login');
		}
	}, [props.isLoggedIn, props.history, props.checkingLoginDone]);

	if (!props.checkingLoginDone) {
		return (
			<div className={classes.Navbar}>
				<CssNavbarCircularProgress
					className={classes.NavLinkLoading}
					size={25}
				/>
			</div>
		);
	}

	const toggleDrawer = (status) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		setDrawerOpen(status);
	};

	const loggedInNavLinks = (
		<React.Fragment>
			<NavLink
				activeClassName={classes.NavLinkActive}
				className={classes.NavLink}
				to="/add"
			>
				<CssPostAddIcon />
				Add Expense
			</NavLink>
			<NavLink
				activeClassName={classes.NavLinkActive}
				className={classes.NavLink}
				to="/list"
			>
				<CssCollectionsBookmarkIcon />
				All Expenses
			</NavLink>
			<div
				onClick={(event) => props.logout()}
				className={classes.NavLink}
			>
				<CssExitToAppIcon />
				Log Out
			</div>
		</React.Fragment>
	);
	const loggedOutNavLinks = (
		<React.Fragment>
			<NavLink
				activeClassName={classes.NavLinkActive}
				className={classes.NavLink}
				to="/login"
			>
				Login
			</NavLink>
			<NavLink
				activeClassName={classes.NavLinkActive}
				className={classes.NavLink}
				to="/register"
			>
				Register
			</NavLink>
		</React.Fragment>
	);
	const drawerLoggedOutNavLinks = (
		<List>
			<ListItem
				button
				onClick={() => {
					props.history.push('/login');
					setDrawerOpen(false);
				}}
			>
				<ListItemText primary={'Login'} />
			</ListItem>
			<ListItem button>
				<ListItemText
					primary={'Register'}
					onClick={() => {
						props.history.push('/register');
						setDrawerOpen(false);
					}}
				/>
			</ListItem>
		</List>
	);
	const drawerLoggedInNavLinks = (
		<List>
			<ListItem
				button
				onClick={() => {
					props.history.push('/add');
					setDrawerOpen(false);
				}}
			>
				<DrawerCssPostAddIcon />
				<ListItemText primary={'Add expense'} />
			</ListItem>
			<ListItem
				button
				onClick={() => {
					props.history.push('/list');
					setDrawerOpen(false);
				}}
			>
				<DrawerCssCollectionsBookmarkIcon />
				<ListItemText primary={'All Expenses'} />
			</ListItem>
			<ListItem
				button
				onClick={(event) => {
					props.logout();
					setDrawerOpen(false);
				}}
			>
				<DrawerCssExitToAppIcon />
				<ListItemText primary={'Log out'} />
			</ListItem>
		</List>
	);
	let navLinks = loggedOutNavLinks;
	let drawerNavLinks = drawerLoggedOutNavLinks;
	let linksClass = [classes.Links, classes.LoggedOutLinks].join(' ');
	if (props.isLoggedIn) {
		navLinks = loggedInNavLinks;
		drawerNavLinks = drawerLoggedInNavLinks;
		linksClass = [classes.Links, classes.LoggedInLinks].join(' ');
	}
	return (
		<React.Fragment>
			<CssDrawer
				anchor={'left'}
				open={drawerOpen}
				onClose={toggleDrawer(false)}
			>
				{drawerNavLinks}
			</CssDrawer>
			<div className={classes.Navbar}>
				<div className={classes.LogoAndHamburger}>
					<div className={classes.Hamburger}>
						<CssMenuIcon onClick={toggleDrawer(true)} />
					</div>
					<div className={classes.Logo}>
						<img height="100%" src={Logo} alt="expense-book" />
					</div>
				</div>
				<div className={linksClass}>{navLinks}</div>
			</div>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => {
	return {
		isLoggedIn: !!state.auth.loggedInEmail,
		checkingLoginDone: state.auth.checkingLoginDone
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(actions.logout())
	};
};

Navbar.propTypes = {
	isLoggedIn: PropTypes.bool,
	checkingLoginDone: PropTypes.bool,
	logout: PropTypes.func
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));

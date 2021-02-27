import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { CssCircularProgress } from '../../utility/widgets';
import LoginForm from '../../components/LoginForm/LoginForm';
import Navbar from '../Navbar/Navbar';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

import classes from './Layout.module.css';

const ExpenseInputForm = React.lazy(() =>
	import('../../components/ExpenseInputForm/ExpenseInputForm')
);

const ExpenseList = React.lazy(() =>
	import('../../components/ExpenseList/ExpenseList')
);

const NotFound = React.lazy(() => import('../../components/NotFound/NotFound'));

const Layout = () => {
	return (
		<React.Fragment>
			<Navbar></Navbar>
			<div className={classes.Layout}>
				<Switch>
					<Redirect exact from="/" to="/login" />
					<Route exact path="/login" component={LoginForm} />
					<Route exact path="/register" component={RegisterForm} />
					<Suspense fallback={<CssCircularProgress />}>
						<Switch>
							<Route
								exact
								path="/add"
								component={ExpenseInputForm}
							/>
							<Route exact path="/list" component={ExpenseList} />
							<Route component={NotFound} />
						</Switch>
					</Suspense>
				</Switch>
			</div>
		</React.Fragment>
	);
};

const matStateToProps = (state) => {
	return {
		isLoggedIn: !!state.auth.loggedInUsername
	};
};

Layout.propTypes = {
	isLoggedIn: PropTypes.bool
};

export default connect(matStateToProps)(Layout);

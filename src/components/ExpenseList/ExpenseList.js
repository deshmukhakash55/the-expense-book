import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { CssCircularProgress } from '../../utility/widgets';
import ExpenseItem from '../ExpenseItem/ExpenseItem';

import * as actions from '../../store/actions/expense';

import classes from './ExpenseList.module.css';

const ExpenseList = (props) => {
	useEffect(() => {
		props.resetAddExpenseSuccess();
	});

	useEffect(() => {
		if (!props.loggedInEmail && props.checkingLoginDone) {
			props.history.push('/login');
		}
	}, [props.loggedInEmail, props.history, props.checkingLoginDone]);

	const { loadExpenses, loggedInEmail } = props;

	useEffect(() => {
		if (loggedInEmail) {
			loadExpenses(loggedInEmail);
		}
	}, [loadExpenses, loggedInEmail]);

	if (!props.checkingLoginDone || props.loadingExpenses) {
		return (
			<div className={classes.PageLoading}>
				<CssCircularProgress />
			</div>
		);
	}

	if (props.expenses.length === 0) {
		return (
			<div className={classes.NoExpensesMessage}>
				No Expenses Added yet
			</div>
		);
	}

	const expenses = props.expenses.map((expense) => (
		<ExpenseItem
			key={expense.id}
			expense={expense}
			delete={(event) => props.removeExpense(expense.id)}
			toggleBookmarkExpense={(event) =>
				props.toggleBookmarkExpense(expense.id)
			}
			togglingBookmarkExpense={
				props.togglingBookmarkExpense === expense.id
			}
			removingExpense={props.removingExpense === expense.id}
		></ExpenseItem>
	));

	return (
		<div className={classes.ExpenseList}>
			{expenses}
			<div className={classes.EmptySpace}></div>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		removeExpense: (expenseId) =>
			dispatch(actions.removeExpense(expenseId)),
		toggleBookmarkExpense: (expenseId) =>
			dispatch(actions.toggleBookmarkExpense(expenseId)),
		loadExpenses: (email) => dispatch(actions.loadExpenses(email)),
		resetAddExpenseSuccess: () => dispatch(actions.resetAddExpenseSuccess())
	};
};

const mapStateToProps = (state) => {
	return {
		expenses: state.expense.expenses,
		loggedInEmail: state.auth.loggedInEmail,
		checkingLoginDone: state.auth.checkingLoginDone,
		loadingExpenses: state.expense.loadingExpenses,
		togglingBookmarkExpense: state.expense.togglingBookmarkExpense,
		removingExpense: state.expense.removingExpense
	};
};

ExpenseItem.propTypes = {
	expenses: PropTypes.arrayOf(
		PropTypes.shape({
			email: PropTypes.string,
			id: PropTypes.string,
			title: PropTypes.string,
			amount: PropTypes.number,
			isBookmarked: PropTypes.bool,
			time: PropTypes.instanceOf(Date)
		})
	),
	loggedInEmail: PropTypes.any,
	checkingLoginDone: PropTypes.bool,
	loadingExpenses: PropTypes.bool,
	togglingBookmarkExpense: PropTypes.any,
	removingExpense: PropTypes.any,
	removeExpense: PropTypes.func,
	toggleBookmarkExpense: PropTypes.func,
	loadExpenses: PropTypes.func
};

export default React.memo(
	connect(mapStateToProps, mapDispatchToProps)(ExpenseList)
);

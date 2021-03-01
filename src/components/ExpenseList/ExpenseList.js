import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { CssCircularProgress } from '../../utility/widgets';
import ExpenseFilter from '../ExpenseFilter/ExpenseFilter';
import ExpenseItem from '../ExpenseItem/ExpenseItem';
import { processExpenses } from '../../utility/utility';

import * as actions from '../../store/actions/expense';

import classes from './ExpenseList.module.css';

const ExpenseList = (props) => {
	const [filters, setFilters] = useState({
		title: '',
		startDate: '',
		endDate: '',
		bookmark: null
	});
	const [processedExpenses, setProcessedExpenses] = useState(props.expenses);

	useEffect(() => {
		props.resetAddExpenseSuccess();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		const processedExpenses = processExpenses(filters, props.expenses);
		setProcessedExpenses(processedExpenses);
	}, [filters, props.expenses]);

	useEffect(() => {
		if (!props.loggedInEmail && props.checkingLoginDone) {
			props.history.push('/login');
		}
	}, [props.loggedInEmail, props.history, props.checkingLoginDone]);

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

	const expenses = processedExpenses.map((expense) => (
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
		<div className={classes.ExpenseFilterAndList}>
			<div className={classes.ExpenseFilter}>
				<ExpenseFilter filters={filters} setFilters={setFilters} />
			</div>
			<div className={classes.ExpenseList}>
				{expenses}
				<div className={classes.EmptySpace}></div>
			</div>
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

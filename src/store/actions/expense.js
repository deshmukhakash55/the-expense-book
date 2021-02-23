import * as actionTypes from './actionTypes/expense';

export const addExpense = (expense) => {
	return {
		type: actionTypes.ADD_EXPENSE,
		payload: { expense }
	};
};

export const addingExpense = () => {
	return {
		type: actionTypes.ADDING_EXPENSE
	};
};

export const addExpenseSuccess = (expense) => {
	return {
		type: actionTypes.ADD_EXPENSE_SUCCESS,
		payload: { expense }
	};
};

export const resetAddExpenseSuccess = () => {
	return {
		type: actionTypes.RESET_ADD_EXPENSE_SUCCESS
	};
};

export const addExpenseFailure = (error) => {
	return {
		type: actionTypes.ADD_EXPENSE_FAILURE,
		payload: { error }
	};
};

export const removeExpense = (expenseId) => {
	return {
		type: actionTypes.REMOVE_EXPENSE,
		payload: { expenseId }
	};
};

export const removingExpense = (expenseId) => {
	return {
		type: actionTypes.REMOVING_EXPENSE,
		payload: { expenseId }
	};
};

export const removeExpenseSuccess = (expenseId) => {
	return {
		type: actionTypes.REMOVE_EXPENSE_SUCCESS,
		payload: { expenseId }
	};
};

export const removeExpenseFailure = (error) => {
	return {
		type: actionTypes.REMOVE_EXPENSE_FAILURE,
		payload: { error }
	};
};

export const toggleBookmarkExpense = (expenseId) => {
	return {
		type: actionTypes.TOGGLE_BOOKMARK_EXPENSE,
		payload: { expenseId }
	};
};

export const togglingBookmarkExpense = (expenseId) => {
	return {
		type: actionTypes.TOGGLING_BOOKMARK_EXPENSE,
		payload: { expenseId }
	};
};

export const toggleBookmarkExpenseSuccess = (expenseId) => {
	return {
		type: actionTypes.TOGGLE_BOOKMARK_EXPENSE_SUCCESS,
		payload: { expenseId }
	};
};

export const toggleBookmarkExpenseFailure = (error) => {
	return {
		type: actionTypes.TOGGLE_BOOKMARK_EXPENSE_FAILURE,
		payload: { error }
	};
};

export const loadExpenses = (email) => {
	return {
		type: actionTypes.LOAD_EXPENSES,
		payload: { email }
	};
};

export const loadingExpenses = () => {
	return {
		type: actionTypes.LOADING_EXPENSES
	};
};

export const loadExpensesSuccess = (expenses) => {
	return {
		type: actionTypes.LOAD_EXPENSES_SUCCESS,
		payload: { expenses }
	};
};

export const loadExpensesFailure = (error) => {
	return {
		type: actionTypes.LOAD_EXPENSES_FAILURE,
		payload: { error }
	};
};

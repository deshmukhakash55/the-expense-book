import * as actionTypes from '../actions/actionTypes/expense';

const initialState = {
	expenses: [],
	loadingExpenses: false,
	loadingFailure: false,
	addingExpense: false,
	addExpenseFailure: false,
	addExpenseSuccess: false,
	removingExpense: null,
	removeExpenseFailure: false,
	removeExpenseSuccess: false,
	togglingBookmarkExpense: null,
	toggleBookmarkFailure: false,
	networkError: false
};

export const expenseReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADDING_EXPENSE:
			return {
				...state,
				addingExpense: true,
				addExpenseSuccess: false,
				addExpenseFailure: false
			};
		case actionTypes.ADD_EXPENSE_SUCCESS:
			return {
				...state,
				addingExpense: false,
				addExpenseFailure: false,
				addExpenseSuccess: true,
				networkError: false
			};
		case actionTypes.RESET_ADD_EXPENSE_SUCCESS:
			return {
				...state,
				addingExpense: false,
				addExpenseFailure: false,
				addExpenseSuccess: false,
				networkError: false
			};
		case actionTypes.ADD_EXPENSE_FAILURE:
			return {
				...state,
				addingExpense: false,
				addExpenseSuccess: false,
				addExpenseFailure: true
			};
		case actionTypes.REMOVING_EXPENSE:
			return {
				...state,
				removingExpense: action.payload.expenseId,
				removeExpenseSuccess: false,
				removeExpenseFailure: false
			};
		case actionTypes.REMOVE_EXPENSE_SUCCESS:
			return {
				...state,
				removingExpense: null,
				removeExpenseSuccess: true,
				removeExpenseFailure: false,
				networkError: false
			};
		case actionTypes.REMOVE_EXPENSE_FAILURE:
			return {
				...state,
				removingExpense: null,
				removeExpenseSuccess: false,
				removeExpenseFailure: true
			};
		case actionTypes.TOGGLING_BOOKMARK_EXPENSE:
			return {
				...state,
				togglingBookmarkExpense: action.payload.expenseId,
				toggleBookmarkFailure: false
			};
		case actionTypes.TOGGLE_BOOKMARK_EXPENSE_SUCCESS:
			const expenseIndex = [...state.expenses].findIndex(
				(expense) => expense.id === action.payload.expenseId
			);
			const clonedExpenses = [...state.expenses];
			clonedExpenses[expenseIndex].isBookmarked = !clonedExpenses[
				expenseIndex
			].isBookmarked;
			return {
				...state,
				expenses: clonedExpenses,
				togglingBookmarkExpense: null,
				toggleBookmarkFailure: false,
				networkError: false
			};
		case actionTypes.TOGGLE_BOOKMARK_EXPENSE_FAILURE:
			return {
				...state,
				togglingBookmarkExpense: null,
				toggleBookmarkFailure: true
			};
		case actionTypes.LOADING_EXPENSES:
			return {
				...state,
				loadingExpenses: true,
				loadingFailure: false
			};
		case actionTypes.LOAD_EXPENSES_SUCCESS:
			return {
				...state,
				expenses: [...action.payload.expenses],
				loadingExpenses: false,
				loadingFailure: false,
				networkError: false
			};
		case actionTypes.LOAD_EXPENSES_FAILURE:
			return {
				...state,
				expenses: [],
				loadingExpenses: false,
				loadingFailure: true
			};
		default:
			return { ...state };
	}
};

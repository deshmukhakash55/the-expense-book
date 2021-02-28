import { channel } from 'redux-saga';
import { put, takeEvery, take } from 'redux-saga/effects';

import { firestore, firestoreSource } from '../../../firebase.config';

import * as actionTypes from '../actionTypes/expense';
import * as actions from '../expense';

const loadExpensesSuccessChannel = channel();

function* loadExpenses(action) {
	try {
		yield put(actions.loadingExpenses());
		yield firestore
			.collection('expenses')
			.where('email', '==', action.payload.email)
			.orderBy('time', 'desc')
			.onSnapshot((querySnapshot) => {
				var expenses = [];
				querySnapshot.forEach((doc) => {
					const rawData = doc.data();
					const time = new Date(
						rawData.time.seconds * 1000 +
							rawData.time.nanoseconds / Math.pow(10, 6)
					);
					expenses.push({ id: doc.id, ...rawData, time });
				});
				loadExpensesSuccessChannel.put(
					actions.loadExpensesSuccess(expenses)
				);
			});
	} catch (error) {
		yield put(actions.loadExpensesFailure(error));
	}
}

function* toggleBookmarkExpense(action) {
	try {
		yield put(actions.togglingBookmarkExpense(action.payload.expenseId));
		const expense = yield firestore
			.collection('expenses')
			.doc(action.payload.expenseId)
			.get();
		yield firestore
			.collection('expenses')
			.doc(action.payload.expenseId)
			.set(
				{
					isBookmarked: !expense.data().isBookmarked
				},
				{ merge: true }
			);
		yield put(actions.toggleBookmarkExpenseSuccess());
	} catch (error) {
		yield put(actions.toggleBookmarkExpenseFailure(error));
	}
}

function* addExpense(action) {
	try {
		yield put(actions.addingExpense());
		const expenseData = {
			...action.payload.expense,
			amount: +action.payload.expense.amount,
			time: firestoreSource.Timestamp.fromDate(new Date()),
			isBookmarked: false
		};
		yield firestore.collection('expenses').add(expenseData);
		yield put(actions.addExpenseSuccess());
	} catch (error) {
		yield put(actions.addExpenseFailure(error));
	}
}

function* removeExpense(action) {
	try {
		yield put(actions.removingExpense(action.payload.expenseId));
		yield firestore
			.collection('expenses')
			.doc(action.payload.expenseId)
			.delete();
		yield put(actions.removeExpenseSuccess());
	} catch (error) {
		yield put(actions.removeExpenseFailure(error));
	}
}

function* expenseSaga() {
	yield takeEvery(actionTypes.LOAD_EXPENSES, loadExpenses);
	yield takeEvery(actionTypes.TOGGLE_BOOKMARK_EXPENSE, toggleBookmarkExpense);
	yield takeEvery(actionTypes.ADD_EXPENSE, addExpense);
	yield takeEvery(actionTypes.REMOVE_EXPENSE, removeExpense);
	while (true) {
		const action = yield take(loadExpensesSuccessChannel);
		yield put(action);
	}
}

export default expenseSaga;

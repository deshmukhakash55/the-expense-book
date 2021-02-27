import { put, takeEvery, all } from 'redux-saga/effects';

import { firestore, firestoreSource } from '../../../firebase.config';

import * as actionTypes from '../actionTypes/expense';
import * as actions from '../expense';

function* loadExpenses(action) {
	try {
		yield put(actions.loadingExpenses());
		const expensesRefs = yield firestore
			.collection('expenses')
			.where('email', '==', action.payload.email)
			.orderBy('time', 'desc')
			.get();
		const ids = yield expensesRefs.docs.map((doc) => doc.id);
		const expenseDocumentsSnapshots = yield all(
			ids.map((id) => {
				return firestore.collection('expenses').doc(id).get();
			})
		);
		const expenses = yield expenseDocumentsSnapshots.map(
			(expenseDocumentsSnapshot) => {
				const id = expenseDocumentsSnapshot.id;
				const rawData = expenseDocumentsSnapshot.data();
				const time = new Date(rawData.time.seconds * 1000);
				return { id, ...rawData, time };
			}
		);
		yield put(actions.loadExpensesSuccess(expenses));
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
		yield put(
			actions.toggleBookmarkExpenseSuccess(action.payload.expenseId)
		);
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
		const expenseRef = yield firestore
			.collection('expenses')
			.add(expenseData);
		const time = new Date(
			expenseData.time.seconds * 1000 +
				expenseData.time.nanoseconds / Math.pow(10, 6)
		);
		yield put(
			actions.addExpenseSuccess({
				id: expenseRef.id,
				...expenseData,
				time
			})
		);
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
		yield put(actions.removeExpenseSuccess(action.payload.expenseId));
	} catch (error) {
		yield put(actions.removeExpenseFailure(error));
	}
}

function* expenseSaga() {
	yield takeEvery(actionTypes.LOAD_EXPENSES, loadExpenses);
	yield takeEvery(actionTypes.TOGGLE_BOOKMARK_EXPENSE, toggleBookmarkExpense);
	yield takeEvery(actionTypes.ADD_EXPENSE, addExpense);
	yield takeEvery(actionTypes.REMOVE_EXPENSE, removeExpense);
}

export default expenseSaga;

import { put, takeEvery } from 'redux-saga/effects';

import { auth, googleProvider } from '../../../firebase.config';

import * as actions from '../auth';
import * as actionTypes from '../actionTypes/auth';

function* register(action) {
	try {
		yield auth.createUserWithEmailAndPassword(
			action.payload.email,
			action.payload.password
		);
		yield auth.currentUser.sendEmailVerification();
		yield put(actions.verficationEmailSentSuccess());
	} catch (error) {
		if (error.code === 'auth/email-already-in-use') {
			yield put(actions.showEmailAlreadyExistsError());
		}
	}
}

function* login(action) {
	try {
		const userCredentials = yield auth.signInWithEmailAndPassword(
			action.payload.email,
			action.payload.password
		);
		const isEmailVerified = auth.currentUser.emailVerified;
		if (!isEmailVerified) {
			yield auth.signOut();
			yield put(actions.emailNotVerified());
		} else {
			yield put(actions.loginSuccess(userCredentials.user.email));
		}
	} catch (error) {
		if (error.code === 'auth/user-not-found') {
			yield put(actions.showUserNotExistError());
		} else if (error.code === 'auth/wrong-password') {
			yield put(actions.showImproperEmailOrPasswordError());
		}
	}
}

function* loginWithGoogle(action) {
	try {
		const result = yield auth.signInWithPopup(googleProvider);
		yield put(actions.loginSuccess(result.user.email));
	} catch (error) {}
}

function* logout() {
	yield auth.signOut();
	yield put(actions.logoutSuccess());
}

function* sendForgotPasswordResetLink(action) {
	yield put(actions.sendingForgotPasswordResetLink());
	yield auth.sendPasswordResetEmail(action.payload.email);
	yield put(actions.sendForgotPasswordResetLinkSuccess());
}

function* authSaga() {
	yield takeEvery(actionTypes.REGISTER, register);
	yield takeEvery(actionTypes.LOGIN, login);
	yield takeEvery(actionTypes.LOGIN_WITH_GOOGLE, loginWithGoogle);
	yield takeEvery(actionTypes.LOGOUT, logout);
	yield takeEvery(
		actionTypes.SEND_FORGOT_PASSWORD_RESET_LINK,
		sendForgotPasswordResetLink
	);
}

export default authSaga;

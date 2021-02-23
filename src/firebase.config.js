import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import {
	apiKey,
	authDomain,
	projectId,
	storageBucket,
	messagingSenderId,
	appId
} from './firebase.properties';

import * as authActions from './store/actions/auth';

const config = {
	apiKey,
	authDomain,
	projectId,
	storageBucket,
	messagingSenderId,
	appId
};

firebase.initializeApp(config);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export const firestoreSource = firebase.firestore;
export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const watchAuthStatus = (store) => {
	auth.onAuthStateChanged(function (user) {
		if (user && user.emailVerified) {
			store.dispatch(authActions.loginSuccess(user.email));
		}
		store.dispatch(authActions.checkingLoginDone());
	});
};

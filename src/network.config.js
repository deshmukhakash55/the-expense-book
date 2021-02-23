import * as networkActions from './store/actions/network';

export const watchNetworkStatus = (store) => {
	if (navigator.onLine) {
		store.dispatch(networkActions.clearNetworkError());
	} else {
		store.dispatch(networkActions.networkError());
	}

	window.addEventListener('online', () => {
		store.dispatch(networkActions.clearNetworkError());
	});

	window.addEventListener('offline', () => {
		store.dispatch(networkActions.networkError());
	});
};

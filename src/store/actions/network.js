import * as actionTypes from './actionTypes/network';

export const networkError = () => {
	return {
		type: actionTypes.NETWORK_ERROR
	};
};

export const clearNetworkError = () => {
	return {
		type: actionTypes.CLEAR_NETWORK_ERROR
	};
};

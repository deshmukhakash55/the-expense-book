import * as actionTypes from '../actions/actionTypes/network';

const initialState = {
	networkError: false
};

export const networkReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.NETWORK_ERROR:
			return {
				...state,
				networkError: true
			};
		case actionTypes.CLEAR_NETWORK_ERROR:
			return {
				...state,
				networkError: false
			};
		default:
			return { ...state };
	}
};

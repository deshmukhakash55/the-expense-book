import * as actionTypes from '../actions/actionTypes/auth';

const initialState = {
	loggedInEmail: null,
	verificationEmailMessage: 'not-shown',
	emailVerificationMessage: false,
	networkError: false,
	checkingLoginDone: false,
	passwordResetLinkSending: false,
	passwordResetLinkSendingSuccess: false,
	shouldShowUserNotExistError: false,
	shouldImproperEmailOrPasswordError: false,
	showEmailAlreadyExistsError: false
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOGIN_SUCCESS:
			return {
				...state,
				loggedInEmail: action.payload.email
			};
		case actionTypes.EMAIL_NOT_VERIFIED:
			return {
				...state,
				emailVerificationMessage: true
			};
		case actionTypes.CHECKING_LOGIN_DONE:
			return {
				...state,
				checkingLoginDone: true
			};
		case actionTypes.CLOSE_EMAIL_NOT_VERIFIED:
			return {
				...state,
				emailVerificationMessage: false
			};
		case actionTypes.SENDING_FORGOT_PASSWORD_RESET_LINK:
			return {
				...state,
				passwordResetLinkSending: true,
				passwordResetLinkSendingSuccess: false
			};
		case actionTypes.SEND_FORGOT_PASSWORD_RESET_LINK_SUCCESS:
			return {
				...state,
				passwordResetLinkSending: false,
				passwordResetLinkSendingSuccess: true
			};
		case actionTypes.SHOW_USER_NOT_EXIST_ERROR:
			return {
				...state,
				shouldShowUserNotExistError: true
			};
		case actionTypes.SHOW_EMAIL_ALREADY_EXISTS_ERROR:
			return {
				...state,
				showEmailAlreadyExistsError: true
			};
		case actionTypes.SHOW_IMPROPER_EMAIL_OR_PASSWORD_ERROR:
			return {
				...state,
				shouldImproperEmailOrPasswordError: true
			};
		case actionTypes.CLEAR_LOGIN_FORM_SUBMITTING_ERROR:
			return {
				...state,
				shouldShowUserNotExistError: false,
				shouldImproperEmailOrPasswordError: false
			};
		case actionTypes.CLEAR_REGISTER_FORM_SUBMITTING_ERROR:
			return {
				...state,
				showEmailAlreadyExistsError: false
			};
		case actionTypes.VERIFICATION_EMAIL_SENT_SUCCESS:
			return {
				...state,
				verificationEmailMessage: 'show'
			};
		case actionTypes.VERIFICATION_EMAIL_MESSAGE_CLOSE:
			return {
				...state,
				verificationEmailMessage: 'showed'
			};
		case actionTypes.LOGOUT_SUCCESS:
			return {
				...state,
				loggedInEmail: null,
				verificationEmailMessage: 'not-shown',
				emailVerificationMessage: false,
				networkError: false
			};
		default:
			return { ...state };
	}
};

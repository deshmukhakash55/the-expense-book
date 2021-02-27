import * as actionTypes from './actionTypes/auth';

export const loginSuccess = (email) => {
	return {
		type: actionTypes.LOGIN_SUCCESS,
		payload: { email }
	};
};

export const login = (email, password) => {
	return {
		type: actionTypes.LOGIN,
		payload: { email, password }
	};
};
export const loginWithGoogle = () => {
	return {
		type: actionTypes.LOGIN_WITH_GOOGLE
	};
};

export const register = (email, password) => {
	return {
		type: actionTypes.REGISTER,
		payload: { email, password }
	};
};

export const emailNotVerified = () => {
	return {
		type: actionTypes.EMAIL_NOT_VERIFIED
	};
};

export const showUserNotExistError = () => {
	return {
		type: actionTypes.SHOW_USER_NOT_EXIST_ERROR
	};
};

export const clearLoginFormSubmittingError = () => {
	return {
		type: actionTypes.CLEAR_LOGIN_FORM_SUBMITTING_ERROR
	};
};

export const clearRegisterFormSubmittingError = () => {
	return {
		type: actionTypes.CLEAR_REGISTER_FORM_SUBMITTING_ERROR
	};
};

export const closeEmailNotVerified = () => {
	return {
		type: actionTypes.CLOSE_EMAIL_NOT_VERIFIED
	};
};

export const showImproperEmailOrPasswordError = () => {
	return {
		type: actionTypes.SHOW_IMPROPER_EMAIL_OR_PASSWORD_ERROR
	};
};

export const showEmailAlreadyExistsError = () => {
	return {
		type: actionTypes.SHOW_EMAIL_ALREADY_EXISTS_ERROR
	};
};

export const checkingLoginDone = () => {
	return {
		type: actionTypes.CHECKING_LOGIN_DONE
	};
};

export const verficationEmailSentSuccess = () => {
	return {
		type: actionTypes.VERIFICATION_EMAIL_SENT_SUCCESS
	};
};

export const verficationEmailMessageClose = () => {
	return {
		type: actionTypes.VERIFICATION_EMAIL_MESSAGE_CLOSE
	};
};

export const logout = () => {
	return {
		type: actionTypes.LOGOUT
	};
};

export const logoutSuccess = () => {
	return {
		type: actionTypes.LOGOUT_SUCCESS
	};
};

export const sendForgotPasswordResetLink = (email) => {
	return {
		type: actionTypes.SEND_FORGOT_PASSWORD_RESET_LINK,
		payload: { email }
	};
};

export const sendingForgotPasswordResetLink = () => {
	return {
		type: actionTypes.SENDING_FORGOT_PASSWORD_RESET_LINK
	};
};

export const sendForgotPasswordResetLinkSuccess = () => {
	return {
		type: actionTypes.SEND_FORGOT_PASSWORD_RESET_LINK_SUCCESS
	};
};

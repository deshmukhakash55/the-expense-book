import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';

import { CssTextField, CssCircularProgress } from '../../utility/widgets';
import { isEmailValid } from '../../utility/utility';

import * as actions from '../../store/actions/auth';

import classes from './LoginForm.module.css';

const LoginForm = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [formErrors, setFormErrors] = useState({
		emailDirty: false,
		passwordDirty: false,
		email: '',
		password: ''
	});
	const [submittingForm, setSubmittingForm] = useState(false);
	const [forgotPassword, setForgotPassword] = useState(false);
	const [highlightedFormSubmitError, setHighlightedForSubmitError] = useState(
		true
	);

	useEffect(() => {
		return () => {
			props.clearLoginFormSubmittingError();
		};

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (props.isLoggedIn && props.checkingLoginDone) {
			props.history.push('/list');
		}
	}, [props.isLoggedIn, props.history, props.checkingLoginDone]);

	useEffect(() => {
		if (props.shouldShowEmailNotVerifiedModal) {
			setSubmittingForm(false);
		}
	}, [props.shouldShowEmailNotVerifiedModal]);

	useEffect(() => {
		if (props.shouldShowUserNotExistError) {
			setSubmittingForm(false);
		}
	}, [props.shouldShowUserNotExistError]);

	useEffect(() => {
		if (props.passwordResetLinkSendingSuccess) {
			setForgotPassword(false);
		}
	}, [props.passwordResetLinkSendingSuccess]);

	if (!props.checkingLoginDone) {
		return (
			<div className={classes.PageLoading}>
				<CssCircularProgress />
			</div>
		);
	}

	const updateEmail = (email) => {
		if (!email) {
			setFormErrors({
				...formErrors,
				email: 'Username is required',
				emailDirty: true
			});
		} else {
			if (!isEmailValid(email)) {
				setFormErrors({
					...formErrors,
					email: 'Invalid Email',
					emailDirty: true
				});
			} else {
				setFormErrors({
					...formErrors,
					email: '',
					emailDirty: true
				});
			}
		}
		setEmail(email);
	};

	const updatePassword = (password) => {
		if (!password) {
			setFormErrors({
				...formErrors,
				password: 'Password is required',
				passwordDirty: true
			});
		} else {
			setFormErrors({
				...formErrors,
				password: '',
				passwordDirty: true
			});
		}
		setPassword(password);
	};

	const shouldDisableLoginButton = () => {
		const formErrorExists = !(!formErrors.email && !formErrors.password);
		const bothInputDirty =
			formErrors.emailDirty && formErrors.passwordDirty;
		return !bothInputDirty || formErrorExists;
	};

	const formSubmit = (event) => {
		event.preventDefault();
		props.login(email, password);
		props.clearLoginFormSubmittingError();
		setHighlightedForSubmitError(false);
		setSubmittingForm(true);
	};

	const closePasswordResetDialog = () => {
		setForgotPassword(false);
	};

	const closeDialog = () => {
		props.closeEmailNotVerifiedModal();
	};

	const isSubmittingForm = () => {
		return submittingForm && !getFormSubmitErrorIfAny();
	};

	const getFormSubmitErrorIfAny = () => {
		if (props.shouldShowUserNotExistError) {
			return 'User does not exist. Please register.';
		}
		if (props.shouldImproperEmailOrPasswordError) {
			return 'Invalid Email or Password.';
		}
	};

	let formSubmitErrorClasses = [classes.FormErrors];

	if (!!getFormSubmitErrorIfAny() && !highlightedFormSubmitError) {
		formSubmitErrorClasses.push(classes.Highlight);
	}

	const closeVerficationEmailMessageDialog = () => {
		props.verficationEmailMessageClose();
	};

	return (
		<React.Fragment>
			<Paper className={classes.LoginInputFormPaper} elevation={3}>
				<h3 className={classes.LoginTitle}>Login</h3>
				<div
					className={formSubmitErrorClasses.join(' ')}
					onAnimationEnd={(event) => {
						formSubmitErrorClasses = formSubmitErrorClasses.filter(
							(className) => className !== classes.Highlight
						);
						setHighlightedForSubmitError(false);
					}}
				>
					{getFormSubmitErrorIfAny()}
				</div>
				<form onSubmit={(event) => formSubmit(event)}>
					<div className={classes.formControl}>
						<FormControl fullWidth variant="outlined">
							<CssTextField
								label="Email"
								variant="outlined"
								value={email}
								required
								disabled={isSubmittingForm()}
								error={!!formErrors.email}
								helperText={
									!!formErrors.email ? formErrors.email : null
								}
								onChange={(event) =>
									updateEmail(event.target.value)
								}
							/>
						</FormControl>
					</div>
					<div className={classes.formControl}>
						<FormControl fullWidth variant="outlined">
							<CssTextField
								label="Password"
								variant="outlined"
								value={password}
								type="password"
								required
								disabled={isSubmittingForm()}
								error={!!formErrors.password}
								helperText={
									!!formErrors.password
										? formErrors.password
										: null
								}
								onChange={(event) =>
									updatePassword(event.target.value)
								}
							/>
						</FormControl>
					</div>
					<div className={classes.FormOptions}>
						<div
							className={classes.FormOption}
							onClick={(event) => setForgotPassword(true)}
						>
							Forgot Password ?
						</div>
						OR
						<div
							className={classes.FormOption}
							onClick={(event) => props.history.push('/register')}
						>
							Join now!
						</div>
					</div>
					<div className={classes.FormAction}>
						{isSubmittingForm() ? (
							<CssCircularProgress size={20} />
						) : (
							<Button
								type="submit"
								disabled={shouldDisableLoginButton()}
								color="default"
							>
								Login
							</Button>
						)}
					</div>
					<div className={classes.GoogleSignIn}>
						<Button
							type="submit"
							color="default"
							disabled={isSubmittingForm()}
							className={classes.GoogleSignInButton}
							onClick={(event) => props.loginWithGoogle()}
						>
							<img
								width="20px"
								className={classes.GoogleIcon}
								alt="Google sign-in"
								src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
							/>
							Sign in with Google
						</Button>
					</div>
				</form>
			</Paper>
			<Dialog
				fullWidth
				open={forgotPassword}
				onClose={closePasswordResetDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle
					className={classes.ForgotPasswordTitle}
					id="alert-dialog-title"
				>
					Forgot Password
				</DialogTitle>
				<DialogContent>
					<FormControl
						className={classes.ForgotPasswordInput}
						fullWidth
						variant="outlined"
					>
						<CssTextField
							label="Email"
							variant="outlined"
							value={email}
							required
							autoFocus
							disabled={props.passwordResetLinkSending}
							error={!!formErrors.email}
							helperText={
								!!formErrors.email ? formErrors.email : null
							}
							onChange={(event) =>
								updateEmail(event.target.value)
							}
						/>
					</FormControl>
				</DialogContent>
				<DialogActions>
					{props.passwordResetLinkSending ? (
						<CssCircularProgress size={20} />
					) : (
						<Button
							onClick={(event) =>
								props.sendForgotPasswordResetLink(email)
							}
							color="default"
							disabled={!!formErrors.email}
							autoFocus
						>
							Send password reset link
						</Button>
					)}
				</DialogActions>
			</Dialog>
			<Dialog
				open={props.shouldShowEmailNotVerifiedModal}
				onClose={closeDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Email not verified'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Please verify your email. Verification mail was sent to
						you earlier.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeDialog} color="default" autoFocus>
						Ok
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={props.shouldShowVerificationEmailSentModal}
				onClose={closeVerficationEmailMessageDialog}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					{'Verification Email Sent'}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Verification email is sent to your email. Please verify
						your email.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={closeVerficationEmailMessageDialog}
						color="default"
						autoFocus
					>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		login: (email, password) => dispatch(actions.login(email, password)),
		closeEmailNotVerifiedModal: () =>
			dispatch(actions.closeEmailNotVerified()),
		sendForgotPasswordResetLink: (email) =>
			dispatch(actions.sendForgotPasswordResetLink(email)),
		loginWithGoogle: () => dispatch(actions.loginWithGoogle()),
		clearLoginFormSubmittingError: () =>
			dispatch(actions.clearLoginFormSubmittingError()),
		verficationEmailMessageClose: () =>
			dispatch(actions.verficationEmailMessageClose())
	};
};

const mapStateToProps = (state) => {
	return {
		isLoggedIn: !!state.auth.loggedInEmail,
		shouldShowEmailNotVerifiedModal: state.auth.emailVerificationMessage,
		checkingLoginDone: state.auth.checkingLoginDone,
		passwordResetLinkSending: state.auth.passwordResetLinkSending,
		shouldShowVerificationEmailSentModal:
			state.auth.verificationEmailMessage === 'show',
		passwordResetLinkSendingSuccess:
			state.auth.passwordResetLinkSendingSuccess,
		shouldShowUserNotExistError: state.auth.shouldShowUserNotExistError,
		shouldImproperEmailOrPasswordError:
			state.auth.shouldImproperEmailOrPasswordError
	};
};

LoginForm.propTypes = {
	isLoggedIn: PropTypes.bool,
	shouldShowEmailNotVerifiedModal: PropTypes.bool,
	checkingLoginDone: PropTypes.bool,
	passwordResetLinkSending: PropTypes.bool,
	passwordResetLinkSendingSuccess: PropTypes.bool,
	shouldShowUserNotExistError: PropTypes.bool,
	shouldImproperEmailOrPasswordError: PropTypes.bool,
	login: PropTypes.func,
	closeEmailNotVerifiedModal: PropTypes.func,
	sendForgotPasswordResetLink: PropTypes.func,
	loginWithGoogle: PropTypes.func,
	clearLoginFormSubmittingError: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

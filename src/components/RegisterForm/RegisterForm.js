import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';

import { isPasswordValid, isEmailValid } from '../../utility/utility';
import { CssTextField, CssCircularProgress } from '../../utility/widgets';

import * as actions from '../../store/actions/auth';

import classes from './RegisterForm.module.css';

const RegisterForm = (props) => {
	if (props.isLoggedIn) {
		props.history.push('/list');
	}

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [formErrors, setFormErrors] = useState({
		emailDirty: false,
		passwordDirty: false,
		confirmPasswordDirty: false,
		email: '',
		password: '',
		confirmPassword: ''
	});
	const [submittingForm, setSubmittingForm] = useState(false);
	const [highlightedFormSubmitError, setHighlightedForSubmitError] = useState(
		true
	);

	useEffect(() => {
		props.clearLoginFormSubmittingError();
	});

	const { shouldShowVerificationEmailSentModal, history } = props;

	useEffect(() => {
		if (shouldShowVerificationEmailSentModal) {
			history.push('/login');
		}
	}, [shouldShowVerificationEmailSentModal, history]);

	let formSubmitErrorClasses = [classes.FormErrors];

	if (props.showEmailAlreadyExistsError && !highlightedFormSubmitError) {
		formSubmitErrorClasses.push(classes.Highlight);
	}

	useEffect(() => {
		if (props.isLoggedIn && props.checkingLoginDone) {
			props.history.push('/list');
		}
	}, [props.isLoggedIn, props.history, props.checkingLoginDone]);

	useEffect(() => {
		if (props.shouldShowVerificationEmailSentModal) {
			setSubmittingForm(false);
			setEmail('');
			setPassword('');
			setConfirmPassword('');
		}
	}, [props.shouldShowVerificationEmailSentModal]);

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
			if (!isPasswordValid(password)) {
				setFormErrors({
					...formErrors,
					password:
						'Password should atleast one lowercase, one uppercase, one numeric, one special character and must have 8 characters or longer',
					passwordDirty: true
				});
			} else {
				setFormErrors({
					...formErrors,
					password: '',
					passwordDirty: true
				});
			}
		}
		setPassword(password);
	};

	const updateConfirmPassword = (confirmPassword) => {
		if (!confirmPassword) {
			setFormErrors({
				...formErrors,
				confirmPassword: 'Please confirm the password',
				confirmPasswordDirty: true
			});
		} else {
			if (password === confirmPassword) {
				setFormErrors({
					...formErrors,
					confirmPassword: '',
					confirmPasswordDirty: true
				});
			} else {
				setFormErrors({
					...formErrors,
					confirmPassword:
						"You imput doesn't match the entered password",
					confirmPasswordDirty: true
				});
			}
		}
		setConfirmPassword(confirmPassword);
	};

	const formSubmit = (event) => {
		event.preventDefault();
		props.register(email, password);
		props.clearRegisterFormSubmittingError();
		setHighlightedForSubmitError(false);
		setSubmittingForm(true);
	};

	const shouldDisableRegisterButton = () => {
		const formErrorExists =
			formErrors.email ||
			formErrors.password ||
			formErrors.confirmPassword;
		const bothInputDirty =
			formErrors.emailDirty &&
			formErrors.passwordDirty &&
			formErrors.confirmPasswordDirty;
		return !!(!bothInputDirty || formErrorExists);
	};

	const getFormSubmitErrorIfAny = () => {
		if (props.showEmailAlreadyExistsError) {
			return 'Email already exists. Try logging in';
		}
	};

	const isSubmittingForm = () => {
		return submittingForm && !getFormSubmitErrorIfAny();
	};

	return (
		<React.Fragment>
			<Paper className={classes.RegisterInputFormPaper} elevation={3}>
				<h3 className={classes.RegisterTitle}>Register</h3>
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
					<div className={classes.formControl}>
						<FormControl fullWidth variant="outlined">
							<CssTextField
								label="Confirm Password"
								variant="outlined"
								value={confirmPassword}
								type="password"
								required
								disabled={isSubmittingForm()}
								error={!!formErrors.confirmPassword}
								helperText={
									!!formErrors.confirmPassword
										? formErrors.confirmPassword
										: null
								}
								onChange={(event) =>
									updateConfirmPassword(event.target.value)
								}
							/>
						</FormControl>
					</div>
					<div className={classes.FormOptions}>
						<div
							className={classes.AlreadyMember}
							onClick={(event) => props.history.push('/login')}
						>
							Already a member ?
						</div>
					</div>
					<div className={classes.FormAction}>
						{isSubmittingForm() ? (
							<CssCircularProgress size={20} />
						) : (
							<Button
								type="submit"
								disabled={shouldDisableRegisterButton()}
								color="default"
							>
								Register
							</Button>
						)}
					</div>
				</form>
			</Paper>
		</React.Fragment>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		register: (email, password) =>
			dispatch(actions.register(email, password)),
		clearLoginFormSubmittingError: () =>
			dispatch(actions.clearLoginFormSubmittingError()),
		clearRegisterFormSubmittingError: () =>
			dispatch(actions.clearRegisterFormSubmittingError())
	};
};

const mapStateToProps = (state) => {
	return {
		isLoggedIn: !!state.auth.loggedInEmail,
		checkingLoginDone: state.auth.checkingLoginDone,
		shouldShowVerificationEmailSentModal:
			state.auth.verificationEmailMessage === 'show',
		showEmailAlreadyExistsError: state.auth.showEmailAlreadyExistsError
	};
};

RegisterForm.propTypes = {
	isLoggedIn: PropTypes.bool,
	shouldShowVerificationEmailSentModal: PropTypes.bool,
	checkingLoginDone: PropTypes.bool,
	showEmailAlreadyExistsError: PropTypes.bool,
	register: PropTypes.func,
	verficationEmailMessageClose: PropTypes.func,
	clearLoginFormSubmittingError: PropTypes.func,
	clearRegisterFormSubmittingError: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';

import {
	CssTextField,
	CssCircularProgress,
	OutlinedInputField,
	CssInputLabel
} from '../../utility/widgets';

import * as actions from '../../store/actions/expense';

import classes from './ExpenseInputForm.module.css';

const ExpenseInputForm = (props) => {
	const [expenseTitle, setExpenseTitle] = useState('');
	const [expenseAmount, setExpenseAmount] = useState('');
	const [highlightedFormSubmitError, setHighlightedForSubmitError] = useState(
		true
	);
	const [formDirty, setFormDirty] = useState({
		title: false,
		amount: false
	});
	const [prevFormSubmitError, setPrevFormSubmitError] = useState('');

	useEffect(() => {
		if (!props.loggedInEmail && props.checkingLoginDone) {
			props.history.push('/login');
		}
	}, [props.loggedInEmail, props.history, props.checkingLoginDone]);

	useEffect(() => {
		props.resetAddExpenseSuccess();
	});

	if (!props.checkingLoginDone) {
		return (
			<div className={classes.PageLoading}>
				<CssCircularProgress />
			</div>
		);
	}

	const formSubmit = (event) => {
		event.preventDefault();
		props.addExpense({
			title: expenseTitle,
			amount: expenseAmount,
			email: props.loggedInEmail
		});
		setExpenseAmount('');
		setExpenseTitle('');
		setFormDirty((prevState) => ({
			...prevState,
			title: false,
			amount: false
		}));
	};

	const closeToastr = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		props.resetAddExpenseSuccess();
	};

	const handleExpenseTitleInput = (title) => {
		const truncatedTitle = title.substring(0, 100);
		setExpenseTitle(truncatedTitle);
		setFormDirty((prevState) => ({
			...prevState,
			title: true
		}));
		setHighlightedForSubmitError(true);
	};

	const handleExpenseAmountInput = (amount) => {
		setExpenseAmount(amount);
		setFormDirty((prevState) => ({
			...prevState,
			amount: true
		}));
		setHighlightedForSubmitError(true);
	};

	const getCharactersLeftForTitle = () => {
		return 100 - expenseTitle.length + ' characters left';
	};

	const getFormSubmitErrorIfAny = () => {
		if (!expenseTitle.length) {
			return 'Title should not be empty';
		}
		if (expenseAmount < 1) {
			return 'Amount should be strictly greater than 0';
		}
	};

	const isFormDirty = () => {
		return formDirty.title || formDirty.amount;
	};

	let formSubmitErrorClasses = [classes.FormErrors];
	const formSubmitError = getFormSubmitErrorIfAny();
	if (
		!!formSubmitError &&
		isFormDirty() &&
		highlightedFormSubmitError &&
		prevFormSubmitError !== formSubmitError
	) {
		formSubmitErrorClasses.push(classes.Highlight);
	}

	return (
		<React.Fragment>
			<Paper className={classes.ExpenseInputFormPaper} elevation={3}>
				<h3 className={classes.CardTitle}>Add Expense</h3>
				<form onSubmit={(event) => formSubmit(event)}>
					{isFormDirty() ? (
						<div
							className={formSubmitErrorClasses.join(' ')}
							onAnimationEnd={(event) => {
								formSubmitErrorClasses = formSubmitErrorClasses.filter(
									(className) =>
										className !== classes.Highlight
								);
								setHighlightedForSubmitError(false);
								setPrevFormSubmitError(
									getFormSubmitErrorIfAny()
								);
							}}
						>
							{getFormSubmitErrorIfAny()}
						</div>
					) : null}
					<div className={classes.formControl}>
						<FormControl fullWidth variant="outlined">
							<CssTextField
								id="outlined-basic"
								label="Title"
								variant="outlined"
								value={expenseTitle}
								helperText={getCharactersLeftForTitle()}
								onChange={(event) =>
									handleExpenseTitleInput(event.target.value)
								}
							/>
						</FormControl>
					</div>
					<div className={classes.formControl}>
						<FormControl fullWidth variant="outlined">
							<CssInputLabel
								className={classes.AmountLabel}
								htmlFor="outlined-adornment-amount"
							>
								Amount
							</CssInputLabel>
							<OutlinedInputField
								id="outlined-adornment-amount"
								value={expenseAmount}
								type="number"
								onChange={(event) =>
									handleExpenseAmountInput(
										+event.target.value
									)
								}
								startAdornment={
									<InputAdornment position="start">
										₹
									</InputAdornment>
								}
								placeholder="Amount"
								labelWidth={60}
							/>
						</FormControl>
					</div>
					<div className={classes.FormAction}>
						{props.addingExpense ? (
							<div className={classes.AddingExpense}>
								<CssCircularProgress size={20} />
							</div>
						) : (
							<Button
								type="submit"
								disabled={!!getFormSubmitErrorIfAny()}
								color="default"
							>
								Add Expense
							</Button>
						)}
					</div>
				</form>
			</Paper>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				open={props.addExpenseSuccess}
				autoHideDuration={6000}
				onClose={closeToastr}
				message="Expense Added"
				action={
					<React.Fragment>
						<IconButton
							size="small"
							aria-label="close"
							color="inherit"
							onClick={closeToastr}
						>
							<CloseIcon fontSize="small" />
						</IconButton>
					</React.Fragment>
				}
			/>
		</React.Fragment>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		addExpense: (expense) => dispatch(actions.addExpense(expense)),
		resetAddExpenseSuccess: () => dispatch(actions.resetAddExpenseSuccess())
	};
};

const mapStateToProps = (state) => {
	return {
		loggedInEmail: state.auth.loggedInEmail,
		checkingLoginDone: state.auth.checkingLoginDone,
		addingExpense: state.expense.addingExpense,
		addExpenseSuccess: state.expense.addExpenseSuccess
	};
};

ExpenseInputForm.propTypes = {
	loggedInEmail: PropTypes.any,
	checkingLoginDone: PropTypes.bool,
	addingExpense: PropTypes.any,
	addExpenseSuccess: PropTypes.bool,
	addExpense: PropTypes.func,
	resetAddExpenseSuccess: PropTypes.func
};

export default React.memo(
	connect(mapStateToProps, mapDispatchToProps)(ExpenseInputForm)
);

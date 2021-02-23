import PropTypes from 'prop-types';
import React from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { CssCircularProgress } from '../../utility/widgets';
import { humanizeTime } from '../../utility/utility';

import classes from './ExpenseItem.module.css';

const ExpenseItem = (props) => {
	return (
		<Card className={classes.ExpenseItem} variant="outlined">
			<CardContent>
				<div className={classes.ExpenseTitle}>
					<h2>{props.expense.title}</h2>
				</div>
				<div className={classes.ExpenseTime}>
					{humanizeTime(props.expense.time)}
				</div>
				<div className={classes.ExpenseAmount}>
					₹{props.expense.amount} /-
				</div>
			</CardContent>
			<CardActions className={classes.CardActions}>
				{props.removingExpense ? (
					<div className={classes.Spinner}>
						<CssCircularProgress size={20} />
					</div>
				) : (
					<Button
						className={classes.CardActionsButton}
						size="small"
						onClick={props.delete}
					>
						DELETE
					</Button>
				)}
				{props.togglingBookmarkExpense ? (
					<div className={classes.Spinner}>
						<CssCircularProgress size={20} />
					</div>
				) : (
					<Button
						size="small"
						className={classes.CardActionsButton}
						onClick={props.toggleBookmarkExpense}
					>
						{props.expense.isBookmarked ? (
							<p>REMOVE BOOKMARKED</p>
						) : (
							<p>BOOKMARK</p>
						)}
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

ExpenseItem.propTypes = {
	expense: PropTypes.shape({
		title: PropTypes.string,
		amount: PropTypes.number,
		isBookmarked: PropTypes.bool,
		time: PropTypes.instanceOf(Date)
	}),
	toggleBookmarkExpense: PropTypes.func,
	togglingBookmarkExpense: PropTypes.bool,
	delete: PropTypes.func,
	removingExpense: PropTypes.bool
};

export default React.memo(ExpenseItem);
